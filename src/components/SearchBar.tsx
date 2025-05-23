import { useState, useRef, useEffect } from 'react'
import { useTimelineStore } from '../store/timelineStore'

const SearchBar = () => {
  const { 
    filters, 
    setSearch, 
    setSearchFocused, 
    isSearchFocused,
    filteredEvents,
    events 
  } = useTimelineStore()
  
  const [localSearch, setLocalSearch] = useState(filters.search)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch)
    }, 200)

    return () => clearTimeout(timer)
  }, [localSearch, setSearch])

  const handleFocus = () => {
    setSearchFocused(true)
  }

  const handleBlur = () => {
    setSearchFocused(false)
  }

  const handleClear = () => {
    setLocalSearch('')
    setSearch('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  const resultsCount = filteredEvents.length
  const totalCount = events.length
  const hasSearch = localSearch.length > 0

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className={`
        relative group transition-all duration-300 ease-out
        ${isSearchFocused 
          ? 'transform scale-105 shadow-2xl shadow-blue-500/25' 
          : 'shadow-lg hover:shadow-xl'
        }
      `}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300" />
        
        <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200">
            <svg 
              className={`w-5 h-5 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search events, technologies, or innovations..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`
              w-full pl-12 pr-20 py-4 bg-transparent 
              text-gray-900 placeholder-gray-500
              focus:outline-none transition-all duration-200
              text-lg font-medium
            `}
          />

          {/* Clear Button */}
          {hasSearch && (
            <button
              onClick={handleClear}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 
                       p-1 rounded-full hover:bg-gray-100 
                       transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Results Count */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <span className={`
              text-sm font-medium px-2 py-1 rounded-full transition-all duration-200
              ${hasSearch 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-400'
              }
            `}>
              {hasSearch ? `${resultsCount}/${totalCount}` : totalCount}
            </span>
          </div>
        </div>
      </div>

      {/* Search Suggestions/Results Preview */}
      {isSearchFocused && hasSearch && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Search Results
              </h4>
              <span className="text-xs text-gray-500">
                {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
              </span>
            </div>
            
            {resultsCount > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-gray-900 truncate">
                          {event.title}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.category} • {new Date(event.date).getFullYear()}
                        </p>
                      </div>
                      <span className={`
                        ml-2 px-2 py-1 text-xs rounded-full flex-shrink-0
                        ${event.impact === 'high' ? 'bg-red-100 text-red-700' :
                          event.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'}
                      `}>
                        {event.impact}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredEvents.length > 5 && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    +{filteredEvents.length - 5} more results
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.43-.94-5.966-2.474C5.107 11.6 4.67 10.304 4.67 9s.437-2.6 1.364-3.526C7.57 4.06 9.66 3.12 12 3.12s4.43.94 5.966 2.474C18.893 6.52 19.33 7.816 19.33 9.12v.355a7.967 7.967 0 01-.955 3.815z" />
                </svg>
                <p className="text-sm">No events found</p>
                <p className="text-xs mt-1">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar 