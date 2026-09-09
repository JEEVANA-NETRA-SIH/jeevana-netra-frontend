import { useEffect, useState } from 'react'
import Preloader from './components/Preloader/Preloader'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import QuoteSection from './components/QuoteSection/QuoteSection'
import ProblemSection from './components/ProblemSection/ProblemSection'
import MeetJeevanaNetra from './components/MeetJeevanaNetra/MeetJeevanaNetra'
import SolutionSection from './components/SolutionSection/SolutionSection'
import HowItWorks from './components/HowItWorks/HowItWorks'
import ExplainableAI from './components/ExplainableAI/ExplainableAI'
import OurTeam from './components/OurTeam/OurTeam'
import AccessibilitySection from './components/AccessibilitySection/AccessibilitySection'
import ImpactSection from './components/ImpactSection/ImpactSection'
import TrainingRoadmapSection from './components/TrainingRoadmapSection/TrainingRoadmapSection'
import FinalCTA from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'login' | 'dashboard'

  const openLogin = () => {
    history.pushState({ view: 'login' }, '')
    setView('login')
    window.scrollTo(0, 0)
  }

  const handleLoginSuccess = () => {
    history.replaceState({ view: 'dashboard' }, '')
    setView('dashboard')
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    history.replaceState({ view: 'home' }, '')
    setView('home')
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPreloaderDone(true), 2000)
    const removeTimer = setTimeout(() => setPreloaderGone(true), 2650)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return

      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', hash)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setView((history.state && history.state.view) || 'home')
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="app">
      {!preloaderGone && <Preloader done={preloaderDone} />}
      {view === 'login' ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : view === 'dashboard' ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <>
          <Navbar onLoginClick={openLogin} />
          <main>
            <Hero />
            <QuoteSection />
            <ProblemSection />
            <MeetJeevanaNetra />
            <HowItWorks />
            <SolutionSection />
            <ExplainableAI />
            <OurTeam />
            <AccessibilitySection />
            <ImpactSection />
            <TrainingRoadmapSection />
            <FinalCTA />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
