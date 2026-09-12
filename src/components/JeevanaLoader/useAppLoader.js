import { useEffect, useRef, useState } from 'react'
import { ASSET_MANIFEST } from './assets'
import { preloadImage } from './preload'

// ——————————————————————————————————————————————————————————————
// Tunables
// ——————————————————————————————————————————————————————————————
const MIN_DISPLAY_MS = 800 // guard against a 100ms flash on fast/cached loads
const READY_HOLD_MS = 900 // "Experience ready" beat before the reveal
const EXIT_MS = 700 // loader blur + fade + light sweep
const MAX_LOAD_MS = 9000 // absolute safety cap — never trap the user
const VIDEO_PROBE_TIMEOUT = 7000 // per-video buffer wait before fallback

const LOADER_MESSAGES = [
  { at: 0, text: 'Initializing Jeevana Netra…' },
  { at: 12, text: 'Preparing visual intelligence…' },
  { at: 28, text: 'Loading retinal visuals…' },
  { at: 46, text: 'Preparing explainable AI experience…' },
  { at: 64, text: 'Loading project experience…' },
  { at: 80, text: 'Optimizing visual assets…' },
  { at: 92, text: 'Almost ready…' },
]

const MSG_MIN_HOLD_MS = 900

// Keep below-the-fold video warm-up elements alive past the loader's unmount
// so the browser keeps fetching them in the background.
const warmPool = []

// ——————————————————————————————————————————————————————————————
// Video progress probe
// Monitors the real hero <video> already mounted by <Hero/> (no duplicate
// download). Falls back to its own element when none is found.
// ——————————————————————————————————————————————————————————————
function createVideoProbe(src, { onUpdate, onResolved, timeoutMs }) {
  const state = { resolved: false, frac: 0, element: null, cleanups: [] }

  const cleanup = () => {
    state.cleanups.forEach((fn) => fn())
    state.cleanups = []
  }

  const resolve = (status) => {
    if (state.resolved) return
    state.resolved = true
    state.frac = 1
    onUpdate(1)
    onResolved(status)
    setTimeout(cleanup, 60)
  }

  const bufferedSeconds = () => {
    const el = state.element
    try {
      if (!el || !el.buffered || el.buffered.length === 0) return 0
      return el.buffered.end(el.buffered.length - 1)
    } catch {
      return 0
    }
  }

  const computeFraction = () => {
    const el = state.element
    if (!el) return 0
    const duration = Number.isFinite(el.duration) ? el.duration : 0
    let frac = 0
    if (duration > 0) frac = Math.min(1, bufferedSeconds() / duration)
    if (el.readyState >= 4) frac = Math.max(frac, 1)
    else if (el.readyState === 3) frac = Math.max(frac, 0.45)
    else if (el.readyState === 2) frac = Math.max(frac, 0.2)
    else if (el.readyState === 1) frac = Math.max(frac, 0.08)
    return Math.min(1, frac)
  }

  const bump = () => {
    const frac = computeFraction()
    state.frac = frac
    onUpdate(frac)
  }

  const bind = (el) => {
    state.element = el

    const onProgress = () => {
      bump()
      const buf = bufferedSeconds()
      if (state.element.readyState >= 3 && (buf >= 12 || computeFraction() >= 0.3)) {
        resolve('sufficient')
      }
    }
    const onCanPlayThrough = () => resolve('ready')
    const onError = () => resolve('error')

    el.addEventListener('progress', onProgress)
    el.addEventListener('loadedmetadata', bump)
    el.addEventListener('canplay', bump)
    el.addEventListener('canplaythrough', onCanPlayThrough)
    el.addEventListener('error', onError)

    state.cleanups.push(() => el.removeEventListener('progress', onProgress))
    state.cleanups.push(() => el.removeEventListener('loadedmetadata', bump))
    state.cleanups.push(() => el.removeEventListener('canplay', bump))
    state.cleanups.push(() => el.removeEventListener('canplaythrough', onCanPlayThrough))
    state.cleanups.push(() => el.removeEventListener('error', onError))

    const settleTimer = setTimeout(() => {
      if (state.resolved) return
      // Events may have already fired before we attached (cached video).
      bump()
      const rs = state.element ? state.element.readyState : 0
      if (rs >= 4) resolve('ready')
      else if (rs >= 3 && bufferedSeconds() >= 12) resolve('sufficient')
    }, 120)
    state.cleanups.push(() => clearTimeout(settleTimer))

    const hardTimer = setTimeout(() => {
      if (state.resolved) return
      if (computeFraction() >= 0.15) resolve('sufficient')
      else resolve('timeout')
    }, timeoutMs)
    state.cleanups.push(() => clearTimeout(hardTimer))
  }

  // Prefer the existing hero video element so no second copy is downloaded.
  const hero = typeof document !== 'undefined' ? document.querySelector('video.hero__video') : null
  if (hero) {
    bind(hero)
  } else {
    const el = document.createElement('video')
    el.muted = true
    el.playsInline = true
    el.preload = 'auto'
    el.setAttribute('src', src)
    bind(el)
    el.load()
  }

  return state
}

// ——————————————————————————————————————————————————————————————
// Loader state machine
// ——————————————————————————————————————————————————————————————
export default function useAppLoader({ onComplete }) {
  const [displayPct, setDisplayPct] = useState(0)
  const [message, setMessage] = useState(LOADER_MESSAGES[0].text)
  const [phase, setPhase] = useState('loading') // loading | ready | exiting

  const displayRef = useRef(0)
  const phaseRef = useRef('loading')
  const completedRef = useRef(false)

  useEffect(() => {
    const startedAt = performance.now()
    const images = new Map() // src -> 'loading' | 'done' | 'failed'
    const measured = { pct: 0, idx: 0 }
    let videoResolved = false
    let videoFrac = 0
    let forced = false
    let readyHoldStart = 0
    let lastMsgChange = performance.now()
    let interval

    const totalWeight = ASSET_MANIFEST.totalWeight

    const imageStatus = (src) =>
      images.get(src) === 'done' || images.get(src) === 'failed'

    const recompute = () => {
      let weight = 0
      for (const img of ASSET_MANIFEST.allImages) {
        if (imageStatus(img.src)) weight += img.weight
      }
      weight += ASSET_MANIFEST.heroVideo.weight * (videoResolved ? 1 : videoFrac)
      measured.pct = Math.min(100, (weight / totalWeight) * 100)
    }

    const updateMessage = () => {
      // Pick the status message that matches where real loading is right now.
      let targetIdx = 0
      for (let i = LOADER_MESSAGES.length - 1; i >= 0; i--) {
        if (measured.pct >= LOADER_MESSAGES[i].at) {
          targetIdx = i
          break
        }
      }
      if (
        targetIdx > measured.idx &&
        performance.now() - lastMsgChange >= MSG_MIN_HOLD_MS
      ) {
        measured.idx = targetIdx
        lastMsgChange = performance.now()
        setMessage(LOADER_MESSAGES[targetIdx].text)
      }
    }

    const criticalImagesDone = () =>
      ASSET_MANIFEST.criticalImages.every((img) => imageStatus(img.src))

    // ——— Kick off real loading ———
    ASSET_MANIFEST.allImages.forEach((img) => {
      images.set(img.src, 'loading')
      preloadImage(img.src).then(({ ok }) => {
        images.set(img.src, ok ? 'done' : 'failed')
        recompute()
      })
    })

    const probe = createVideoProbe(ASSET_MANIFEST.heroVideo.src, {
      timeoutMs: VIDEO_PROBE_TIMEOUT,
      onUpdate: (frac) => {
        videoFrac = frac
        recompute()
      },
      onResolved: () => {
        videoResolved = true
        recompute()
      },
    })

    // Warm the below-the-fold video only after the reveal, so the hero video
    // never competes with it for bandwidth during the critical window.
    let secondaryWarmed = false
    const warmSecondary = () => {
      if (secondaryWarmed) return
      secondaryWarmed = true
      if (typeof document === 'undefined') return
      const el = document.createElement('video')
      el.muted = true
      el.playsInline = true
      el.preload = 'auto'
      el.setAttribute('src', ASSET_MANIFEST.secondaryVideo.src)
      el.load()
      warmPool.push(el)
    }

    // Remove the static boot splash so it can never reappear under the loader.
    const bootSplash = document.getElementById('boot-splash')
    if (bootSplash) bootSplash.remove()

    const previousOverflow = document.body.style.overflow
    const previousEnv = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const tick = () => {
      const elapsed = performance.now() - startedAt
      if (elapsed >= MAX_LOAD_MS && !forced) forced = true

      let target = forced ? 100 : measured.pct
      if (phaseRef.current !== 'loading') target = 100

      // Smoothly ease the displayed figure toward the measured one.
      displayRef.current += (target - displayRef.current) * 0.2
      if (Math.abs(target - displayRef.current) < 0.05) displayRef.current = target
      setDisplayPct((prev) =>
        Math.abs(prev - displayRef.current) >= 0.1 ? displayRef.current : prev
      )

      const phaseNow = phaseRef.current

      if (phaseNow === 'loading') {
        const readyToGo =
          criticalImagesDone() &&
          videoResolved &&
          elapsed >= MIN_DISPLAY_MS &&
          (forced || measured.pct >= 95)

        if (readyToGo) {
          phaseRef.current = 'ready'
          setPhase('ready')
          setMessage('Ready')
          readyHoldStart = performance.now()
        } else {
          updateMessage()
        }
      } else if (phaseNow === 'ready') {
        if (performance.now() - readyHoldStart >= READY_HOLD_MS) {
          phaseRef.current = 'exiting'
          setPhase('exiting')
          warmSecondary()
        }
      } else if (phaseNow === 'exiting') {
        if (performance.now() - (readyHoldStart + READY_HOLD_MS) >= EXIT_MS) {
          if (!completedRef.current) {
            completedRef.current = true
            document.body.style.overflow = previousOverflow
            document.documentElement.style.overflow = previousEnv
            clearInterval(interval)
            if (probe && typeof probe.cleanups?.forEach === 'function') {
              probe.cleanups.forEach((fn) => fn())
            }
            onComplete?.()
          }
          return
        }
      }

      recompute()
    }

    interval = setInterval(tick, 90)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousEnv
      if (probe && typeof probe.cleanups?.forEach === 'function') {
        probe.cleanups.forEach((fn) => fn())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { displayPct, message, phase }
}