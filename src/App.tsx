import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Timeline from './components/Timeline'
import InteractiveMap from './components/InteractiveMap'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/map" element={<InteractiveMap />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
