import { useEffect } from 'react'
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

  // Load events data on component mount
  useEffect(() => {
    setEvents(eventsData as Event[])
  }, [setEvents])

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
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Silicon Atlas
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover the pivotal moments that shaped technology
                </p>
              </div>
              
              <SearchBar />
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