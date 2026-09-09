import './Preloader.css'

export default function Preloader({ done }) {
  return (
    <div className={`preloader ${done ? 'preloader--done' : ''}`} aria-hidden="true">
      <div className="preloader__glow" />
      <div className="preloader__ripple preloader__ripple--1" />
      <div className="preloader__ripple preloader__ripple--2" />
      <div className="preloader__particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="preloader__logo">
        <img src="/newheronavbarlogo.png" alt="" />
      </div>
    </div>
  )
}
