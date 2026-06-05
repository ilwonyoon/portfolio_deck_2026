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

  if (path === '/highlight') {
    return <DeckWorkspace mode="viewer" deck="highlight" />
  }

  if (path === '/portfolio-v2') {
    return <DeckWorkspace mode="viewer" deck="portfolio-v2" />
  }

  if (path === '/cartesia') {
    return <DeckWorkspace mode="viewer" deck="cartesia" />
  }

  if (path === '/admin' || path === '/Admin') {
    return <DeckWorkspace mode="admin" />
  }

  return <LandingPage />
}

export default App
