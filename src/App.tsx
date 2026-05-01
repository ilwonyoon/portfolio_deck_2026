import { DeckWorkspace } from './pages/DeckWorkspace'
import { LandingPage } from './pages/LandingPage'

function readRoute() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}

function App() {
  const path = readRoute()

  if (path === '/portfolio') {
    return <DeckWorkspace mode="viewer" />
  }

  if (path === '/admin' || path === '/Admin') {
    return <DeckWorkspace mode="admin" />
  }

  return <LandingPage />
}

export default App
