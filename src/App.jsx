import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <ToastProvider>
      <div className={darkMode ? 'dark' : ''}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark text-white transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ToastProvider>
  )
}

export default App