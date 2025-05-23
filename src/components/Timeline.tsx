import { useEffect, useState } from 'react'
import type { Event } from '../types/Event'
import { useTimelineStore } from '../store/timelineStore'
import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'
import EventCard from './EventCard'
import eventsData from '../data/events.json'

const Timeline = () => {
  const { 
    filteredEvents,
    viewMode,
    setEvents,
    selectedEvent,
    setSelectedEvent
  } = useTimelineStore()

  // Scroll state for hiding/showing search bar
  const [isSearchVisible, setIsSearchVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Load events data on component mount
  useEffect(() => {
    setEvents(eventsData as Event[])
  }, [setEvents])

  // Scroll detection for search bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 100 // Only start hiding after scrolling 100px
      
      if (currentScrollY < scrollThreshold) {
        // Always show at the top
        setIsSearchVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scrolling down - hide search bar
        setIsSearchVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show search bar
        setIsSearchVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [lastScrollY])

  const renderEventList = () => {
    if (filteredEvents.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.43-.94-5.966-2.474C5.107 11.6 4.67 10.304 4.67 9s.437-2.6 1.364-3.526C7.57 4.06 9.66 3.12 12 3.12s4.43.94 5.966 2.474C18.893 6.52 19.33 7.816 19.33 9.12v.355a7.967 7.967 0 01-.955 3.815z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )
    }

    switch (viewMode) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )
      
      case 'list':
        return (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="max-w-4xl mx-auto">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        )
      
      case 'timeline':
      default:
        return (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full shadow-lg" />
            
            {/* Events */}
            <div className="space-y-12">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg">
                      <div className="w-full h-full bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Event Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <EventCard event={event} index={index} />
                  </div>
                  
                  {/* Spacer */}
                  <div className="w-2/12" />
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`transition-all duration-300 ${isSearchVisible ? 'py-6' : 'py-4'}`}>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Silicon Atlas
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover the pivotal moments that shaped technology
                </p>
              </div>
              
              <div className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isSearchVisible 
                  ? 'max-h-32 opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-4'
                }
              `}>
                <SearchBar />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <FilterPanel />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Stats */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-600">{filteredEvents.length}</span> events
              {viewMode === 'timeline' && filteredEvents.length > 0 && (
                <span className="ml-2 text-sm">
                  • Spanning {new Date(Math.min(...filteredEvents.map(e => new Date(e.date).getTime()))).getFullYear()} 
                  - {new Date(Math.max(...filteredEvents.map(e => new Date(e.date).getTime()))).getFullYear()}
                </span>
              )}
            </p>
          </div>

          {/* Events Display */}
          {renderEventList()}
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Created by{''}
                <a 
                  href="https://www.linkedin.com/in/nassim-a-265944286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    font-semibold text-blue-600 hover:text-blue-700 
                    transition-colors duration-200 
                    hover:underline decoration-2 underline-offset-2
                  "
                >
                  Nassim Ameur
                </a>
              </p>
              <p className="text-sm text-gray-500">
                Discover the pivotal moments that shaped technology
              </p>
            </div>
          </div>
        </footer>

        {/* Floating Search Button - appears when search bar is hidden */}
        {!isSearchVisible && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setIsSearchVisible(true)
            }}
            className="
              fixed bottom-6 right-6 z-50
              bg-blue-600 hover:bg-blue-700 text-white
              w-14 h-14 rounded-full shadow-2xl shadow-blue-500/25
              flex items-center justify-center
              transition-all duration-300 ease-out
              hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/40
              animate-in slide-in-from-bottom-8
            "
            title="Search events"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}

        {/* Event Modal/Detail */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedEvent.title}
                  </h2>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    {new Date(selectedEvent.date).toLocaleDateString('en', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                  
                  {selectedEvent.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {selectedEvent.url && (
                    <a 
                      href={selectedEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Timeline 