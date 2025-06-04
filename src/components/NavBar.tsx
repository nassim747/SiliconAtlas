import { Link, useLocation } from 'react-router-dom'
import { useTimelineStore } from '../store/timelineStore'

const NavBar = () => {
  const location = useLocation()
  const { isDarkMode, toggleDarkMode } = useTimelineStore()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/80 border-gray-200/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Silicon Atlas
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Created by Nassim Ameur
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                isActive('/') 
                  ? isDarkMode 
                    ? 'text-blue-400 bg-blue-900/30' 
                    : 'text-blue-600 bg-blue-50'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-gray-100'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/timeline"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                isActive('/timeline') 
                  ? isDarkMode 
                    ? 'text-blue-400 bg-blue-900/30' 
                    : 'text-blue-600 bg-blue-50'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-gray-100'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Timeline
            </Link>

            <Link
              to="/map"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                isActive('/map') 
                  ? isDarkMode 
                    ? 'text-blue-400 bg-blue-900/30' 
                    : 'text-blue-600 bg-blue-50'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-gray-100'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Map
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-lg transition-all duration-200 hover:scale-110
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }
              `}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar 