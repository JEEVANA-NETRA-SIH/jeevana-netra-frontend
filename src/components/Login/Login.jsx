import { useState, useRef } from 'react'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import './Login.css'

/* =========================================================
   DEMO ONLY — REPLACE WITH REAL BACKEND AUTHENTICATION BEFORE PRODUCTION
   Hard-coded demo credentials: username "mits1", password "777".
   This is NOT secure production authentication.
   ========================================================= */

const DEMO_USERNAME = 'mits1'
const DEMO_PASSWORD = '777'

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  const [phase, setPhase] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [touched, setTouched] = useState({ username: false, password: false })

  const passwordRef = useRef(null)

  const validate = () => {
    const errs = {}
    if (!username.trim()) errs.username = 'Username is required.'
    if (!password) errs.password = 'Password is required.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (phase === 'loading' || phase === 'success') return

    const errs = validate()
    setTouched({ username: true, password: true })
    if (errs.username || errs.password) {
      setErrorMsg(errs.username || errs.password)
      setPhase('error')
      setAttempts((a) => a + 1)
      if (errs.password) {
        setTimeout(() => passwordRef.current && passwordRef.current.focus(), 50)
      }
      return
    }

    // Demo credential check
    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setErrorMsg('')
      setPhase('loading')
      setTimeout(() => {
        setPhase('success')
        setTimeout(() => onSuccess(), 1400)
      }, 900)
    } else {
      setErrorMsg('Invalid demo credentials')
      setPhase('error')
      setAttempts((a) => a + 1)
      setPassword('')
      setTouched((t) => ({ ...t, username: true, password: true }))
      setTimeout(() => passwordRef.current && passwordRef.current.focus(), 350)
    }
  }

  const handleForgot = (e) => {
    e.preventDefault()
    setShowForgot(true)
  }

  const isInvalid = (field) => {
    if (phase !== 'error') return false
    if (errorMsg === 'Invalid demo credentials') return touched[field]
    return touched[field] && (field === 'username' ? !username.trim() : !password)
  }

  return (
    <div className="login" key={attempts}>
      <div className="login__panel">
        <div className="login__visual" aria-hidden="true">
          <img className="login__retina" src="/healthyretina.jpeg" alt="" />
          <div className="login__scan-ring login__scan-ring--1" />
          <div className="login__scan-ring login__scan-ring--2" />
          <div className="login__scan-ring login__scan-ring--3" />
          <div className="login__scanline" />
          <div className="login__glow" />
          <span className="login__particle login__particle--1" />
          <span className="login__particle login__particle--2" />
          <span className="login__particle login__particle--3" />
          <span className="login__particle login__particle--4" />
          <div className="login__hud login__hud--topleft">AI · SCAN</div>
          <div className="login__hud login__hud--bottomleft">FUNDUS ANALYSIS</div>
          <div className="login__brand">
            <img className="login__brand-logo" src="/newheronavbarlogo.png" alt="" />
            <h1 className="login__brand-title">JEEVANA NETRA</h1>
            <p className="login__brand-tag">
              AI-powered retinal screening for a healthier tomorrow.
            </p>
            <p className="login__brand-sub">
              Intelligent retinal analysis designed to make early screening more
              accessible, explainable, and scalable.
            </p>
            <div className="login__status">
              <span className="login__status-dot" />
              AI SCREENING PLATFORM
            </div>
          </div>
        </div>

        <div className="login__form-wrap">
          <div className={`login__card ${phase === 'error' ? 'login__card--shake' : ''}`}>
            <div className="login__card-head">
              <img className="login__card-logo" src="/newheronavbarlogo.png" alt="Jeevana Netra" />
              <h2 className="login__card-title">Welcome to Jeevana Netra</h2>
              <p className="login__card-sub">Sign in to access the screening platform.</p>
            </div>

            {showForgot && (
              <p className="login__forgot-msg" role="status">
                Demo mode — password recovery is disabled.
              </p>
            )}

            <form className="login__form" onSubmit={handleSubmit} noValidate>
              <div className="login__field">
                <label className="login__label" htmlFor="login-username">Username</label>
                <input
                  id="login-username"
                  className={`login__input ${isInvalid('username') ? 'login__input--invalid' : ''}`}
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="login__field">
                <label className="login__label" htmlFor="login-password">Password</label>
                <div className={`login__input-wrap ${isInvalid('password') ? 'login__input-wrap--invalid' : ''}`}>
                  <input
                    id="login-password"
                    ref={passwordRef}
                    className="login__input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login__eye"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="login__row">
                <label className="login__remember">
                  <input type="checkbox" className="login__checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="login__forgot" onClick={handleForgot}>
                  Forgot password?
                </button>
              </div>

              {phase === 'error' && (
                <div className="login__error" role="alert">
                  <strong>{errorMsg}</strong>
                  <span>Please check your username and password and try again.</span>
                </div>
              )}

              <button
                type="submit"
                className={`login__submit ${phase === 'success' ? 'login__submit--success' : ''}`}
                disabled={phase === 'loading' || phase === 'success'}
              >
                {phase === 'loading' && <span className="login__spinner" aria-hidden="true" />}
                {phase === 'success' && <Check className="login__check" size={20} aria-hidden="true" />}
                <span>
                  {phase === 'loading' && 'Signing in...'}
                  {phase === 'success' && 'Welcome back!'}
                  {phase !== 'loading' && phase !== 'success' && 'Sign In'}
                </span>
              </button>

              <button type="button" className="login__back-mobile" onClick={() => history.back()} aria-label="Back to home">
                <ArrowLeft size={15} /> Back to home
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
