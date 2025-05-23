import { useState } from 'react'
import { useTimelineStore } from '../store/timelineStore'

const FilterPanel = () => {
  const { 
    filters, 
    toggleCategory, 
    toggleImpact, 
    clearFilters,
    viewMode,
    setViewMode,
    events,
    filteredEvents
  } = useTimelineStore()

  const [isExpanded, setIsExpanded] = useState(false)

  // Get unique categories from events
  const categories = Array.from(new Set(events.map(event => event.category)))
  const impacts: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.impact.length > 0 ||
    filters.search.length > 0

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

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
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
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear all
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel 