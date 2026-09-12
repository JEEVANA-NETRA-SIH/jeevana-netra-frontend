// Lightweight asset preloading helpers.
// Results are cached per URL in module scope so the same resource is never
// requested twice, even across StrictMode remounts.

const imageCache = new Map()

const DEFAULT_IMAGE_TIMEOUT = 14000

/**
 * Warm an image into the browser cache.
 *
 * Never rejects: a failed decode resolves with { ok: false } so a broken
 * non-critical asset cannot permanently block the application.
 *
 * @param {string} src
 * @param {{ timeoutMs?: number }} [options]
 * @returns {Promise<{ src: string, ok: boolean, timedOut?: boolean }>}
 */
export function preloadImage(src, { timeoutMs = DEFAULT_IMAGE_TIMEOUT } = {}) {
  if (imageCache.has(src)) return imageCache.get(src)

  const promise = new Promise((resolve) => {
    const img = new Image()
    let settled = false

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true
        resolve({ src, ok: false, timedOut: true })
      }
    }, timeoutMs)

    const finish = (ok) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve({ src, ok })
    }

    img.onload = () => finish(true)
    img.onerror = () => finish(false)
    img.decoding = 'async'
    img.src = src
  })

  imageCache.set(src, promise)
  return promise
}