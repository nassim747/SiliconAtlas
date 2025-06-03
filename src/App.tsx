import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Timeline from './components/Timeline'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/map" element={<div className="pt-20 text-center">Interactive Map - Coming Soon!</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
