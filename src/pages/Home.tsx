import { Link } from 'react-router-dom'
import { useTimelineStore } from '../store/timelineStore'

const Home = () => {
  const { isDarkMode } = useTimelineStore()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30'}`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-30 ${isDarkMode ? 'opacity-10' : ''}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? 'rgba(147, 197, 253, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <div className="mb-8">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Silicon Atlas
                </span>
              </h1>
              <p className={`text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover the pivotal moments that shaped the semiconductor industry
              </p>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                From the first transistor to modern AI chips, explore the timeline of technological breakthroughs 
                that power our digital world.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/timeline"
                className={`
                  group relative px-8 py-4 text-lg font-semibold rounded-2xl
                  transition-all duration-300 ease-out
                  transform hover:scale-105 hover:shadow-2xl
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
                  }
                  hover:shadow-blue-500/40
                `}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Explore Timeline</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/map"
                className={`
                  group relative px-8 py-4 text-lg font-semibold rounded-2xl
                  border-2 transition-all duration-300 ease-out
                  transform hover:scale-105
                  ${isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                  }
                `}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Interactive Map</span>
                </span>
              </Link>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-lg mb-4 mx-auto flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Interactive Timeline</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Navigate through decades of semiconductor innovations with this interactive timeline interface.
                </p>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-lg mb-4 mx-auto flex items-center justify-center ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advanced Search</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Filter events by category, impact level, date range, or search through descriptions and tags.
                </p>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-lg mb-4 mx-auto flex items-center justify-center ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Global Supply Chain</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Explore the interconnected global semiconductor supply chain with an interactive map (i'm building it).
                </p>
              </div>
            </div>

            {/* About This Project Section */}
            <div className="mt-20">
              <div className={`max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white/30 border-gray-200'}`}>
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>About This Project</h2>
                <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I got passioned about the semiconductor industry in the last months after reading Chip War.
                  Which is... kinda of logic since I love geopolitics and tech that is at the intersection of powerful strategic interests that are crucial in determining the future of our world.
                  So I decided to build this website to help me, and potentially others, to understand this industry better, in a less boring way than some D.C. based think tank-made PDF
                </p>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I really had pleasure building this, as it taught me a lot of things about development and an industry that I love.
                </p>
              </div>
            </div>

            {/* Meet the Creator Section */}
            <div className="mt-20">
              <div className={`max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white/30 border-gray-200'}`}>
                <div className="text-center">
                  <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Meet the Creator</h2>
                  <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Hi! I'm Nassim. Currently doing Math & CS at McGill.
                  </p>
                  <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Additionally to Maths and Computer Science, I happen to have various other interests such as geopolitics, history, finance and more. This has naturally led me to get passionate by various aspects of the semiconductor industry, which can often be at the intersection of so many fields.
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://nassimameur.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                        hover:scale-105 hover:shadow-md
                        ${isDarkMode 
                          ? 'border-gray-600 hover:border-green-500 text-gray-300 hover:text-green-400' 
                          : 'border-gray-300 hover:border-green-500 text-gray-600 hover:text-green-600'
                        }
                      `}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <span>Portfolio</span>
                    </a>

                    <a 
                      href="https://www.linkedin.com/in/nassim-a-265944286/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                        hover:scale-105 hover:shadow-md
                        ${isDarkMode 
                          ? 'border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400' 
                          : 'border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600'
                        }
                      `}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    
                    <a 
                      href="https://github.com/nassim747"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                        hover:scale-105 hover:shadow-md
                        ${isDarkMode 
                          ? 'border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400' 
                          : 'border-gray-300 hover:border-purple-500 text-gray-600 hover:text-purple-600'
                        }
                      `}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 