import { useState } from 'react'
import { useTimelineStore } from '../store/timelineStore'

const FilterPanel = () => {
  const { 
    filters, 
    toggleCategory, 
    toggleImpact, 
    clearFilters,
    setDateRange,
    viewMode,
    setViewMode,
    events,
    filteredEvents
  } = useTimelineStore()

  const [isExpanded, setIsExpanded] = useState(false)

  // Get unique categories from events
  const categories = Array.from(new Set(events.map(event => event.category)))
  const impacts: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']

  // Get min and max dates from events for date input bounds
  const eventDates = events.map(event => new Date(event.date))
  const minDate = eventDates.length > 0 ? new Date(Math.min(...eventDates.map(d => d.getTime()))) : new Date()
  const maxDate = eventDates.length > 0 ? new Date(Math.max(...eventDates.map(d => d.getTime()))) : new Date()

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.impact.length > 0 ||
    filters.search.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end

  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
    }
  }

  const getCategoryColor = (_category: string, index: number) => {
    const colors = [
      'bg-blue-100 text-blue-700 border-blue-200',
      'bg-purple-100 text-purple-700 border-purple-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200',
      'bg-pink-100 text-pink-700 border-pink-200',
      'bg-cyan-100 text-cyan-700 border-cyan-200',
      'bg-orange-100 text-orange-700 border-orange-200',
    ]
    return colors[index % colors.length]
  }

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    if (field === 'start') {
      setDateRange(value || undefined, filters.dateRange.end)
    } else {
      setDateRange(filters.dateRange.start, value || undefined)
    }
  }

  const clearDateRange = () => {
    setDateRange(undefined, undefined)
  }

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return ''
    return dateString.split('T')[0] // Convert to YYYY-MM-DD format
  }

  return (
    <div className="bg-white/95 backdrop-blur-md border-2 border-gray-300/60 rounded-2xl shadow-xl">
      {/* Header */}
      <div 
        className="p-4 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-100/80 transition-colors duration-200 bg-gray-50/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {filteredEvents.length} of {events.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={(e) => {
                  e.stopPropagation() // Prevent triggering the header click
                  clearFilters()
                }}
                className="
                  flex items-center space-x-1 px-3 py-1.5 text-xs font-medium 
                  bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700
                  border border-red-200 hover:border-red-300
                  rounded-md transition-all duration-200
                  hover:shadow-sm active:scale-95
                "
                title="Clear all active filters"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear all</span>
              </button>
            )}
            
            <div className="p-1 rounded-md group-hover:bg-gray-100 transition-colors">
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="p-4 space-y-6">
          {/* View Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              View Mode
            </label>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {(['timeline', 'grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`
                    flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${viewMode === mode
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  {mode === 'timeline' && (
                    <span className="flex items-center justify-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Timeline</span>
                    </span>
                  )}
                  {mode === 'grid' && (
                    <span className="flex items-center justify-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>Grid</span>
                    </span>
                  )}
                  {mode === 'list' && (
                    <span className="flex items-center justify-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      <span>List</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              {(filters.dateRange.start || filters.dateRange.end) && (
                <button
                  onClick={clearDateRange}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear dates
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={formatDateForInput(filters.dateRange.start)}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  min={minDate.toISOString().split('T')[0]}
                  max={filters.dateRange.end || maxDate.toISOString().split('T')[0]}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={formatDateForInput(filters.dateRange.end)}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  min={filters.dateRange.start || minDate.toISOString().split('T')[0]}
                  max={maxDate.toISOString().split('T')[0]}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Date Range Display */}
            {(filters.dateRange.start || filters.dateRange.end) && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-blue-700">
                    {filters.dateRange.start ? new Date(filters.dateRange.start).getFullYear() : 'Start'} 
                    {' → '}
                    {filters.dateRange.end ? new Date(filters.dateRange.end).getFullYear() : 'End'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => {
                const isSelected = filters.categories.includes(category)
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                      ${isSelected 
                        ? getCategoryColor(category, index) + ' shadow-sm'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Impact Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Impact Level
            </label>
            <div className="flex flex-wrap gap-2">
              {impacts.map((impact) => {
                const isSelected = filters.impact.includes(impact)
                return (
                  <button
                    key={impact}
                    onClick={() => toggleImpact(impact)}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 capitalize
                      ${isSelected 
                        ? getImpactColor(impact) + ' shadow-sm'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    {impact} Impact
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {!isExpanded && hasActiveFilters && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {filters.categories.length > 0 && (
              <span>{filters.categories.length} categories</span>
            )}
            {filters.impact.length > 0 && (
              <span>{filters.impact.length} impact levels</span>
            )}
            {filters.search && (
              <span>Search active</span>
            )}
            {(filters.dateRange.start || filters.dateRange.end) && (
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {filters.dateRange.start ? new Date(filters.dateRange.start).getFullYear() : 'Start'} 
                  {' → '}
                  {filters.dateRange.end ? new Date(filters.dateRange.end).getFullYear() : 'End'}
                </span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel 