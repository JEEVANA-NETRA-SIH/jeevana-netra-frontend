import { useCallback, useEffect, useState } from 'react'
import JeevanaLoader from './components/JeevanaLoader/JeevanaLoader'
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
import AboutPage from './components/AboutPage/AboutPage'
import AccessibilitySection from './components/AccessibilitySection/AccessibilitySection'
import ImpactSection from './components/ImpactSection/ImpactSection'
import TrainingRoadmapSection from './components/TrainingRoadmapSection/TrainingRoadmapSection'
import FinalCTA from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'
import FloatingActions from './components/FloatingActions/FloatingActions'

function App() {
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'login' | 'dashboard' | 'team' | 'about'

  const openLogin = () => {
    history.pushState({ view: 'login' }, '')
    setView('login')
    window.scrollTo(0, 0)
  }

  const openTeam = () => {
    history.pushState({ view: 'team' }, '')
    setView('team')
    window.scrollTo(0, 0)
  }

  const openAbout = () => {
    history.pushState({ view: 'about' }, '')
    setView('about')
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
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) {
        const homeHash = ['#hero', '#roadmap', '#how-it-works', '#explainable-ai', '#impact', '#cta'].some(
          (h) => h === hash
        )
        if (homeHash) {
          e.preventDefault()
          history.pushState({ view: 'home' }, '')
          setView('home')
          requestAnimationFrame(() => {
            const el = document.querySelector(hash)
            const targetEl = el || document.querySelector('#hero')
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        }
        return
      }

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

  const handleLoaderComplete = useCallback(() => setPreloaderGone(true), [])

  return (
    <div className="app">
      {!preloaderGone && <JeevanaLoader onComplete={handleLoaderComplete} />}
      {view === 'login' ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : view === 'dashboard' ? (
        <Dashboard onLogout={handleLogout} />
      ) : view === 'team' ? (
        <>
          <Navbar
            onLoginClick={openLogin}
            onTeamClick={openTeam}
            onAboutClick={openAbout}
            currentView={view}
          />
          <main>
            <OurTeam />
          </main>
          <Footer />
        </>
      ) : view === 'about' ? (
        <>
          <Navbar
            onLoginClick={openLogin}
            onTeamClick={openTeam}
            onAboutClick={openAbout}
            currentView={view}
          />
          <main>
            <AboutPage onTeamClick={openTeam} />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Navbar
            onLoginClick={openLogin}
            onTeamClick={openTeam}
            onAboutClick={openAbout}
            currentView={view}
          />
          <main>
            <Hero />
            <QuoteSection />
            <ProblemSection />
            <MeetJeevanaNetra />
            <HowItWorks />
            <SolutionSection />
            <ExplainableAI />
            <AccessibilitySection />
            <ImpactSection />
            <TrainingRoadmapSection />
            <FinalCTA />
          </main>
          <Footer />
          <FloatingActions />
        </>
      )}
    </div>
  )
}

export default App
