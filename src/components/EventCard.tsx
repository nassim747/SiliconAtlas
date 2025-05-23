import { useState } from 'react'
import type { Event } from '../types/Event'
import { useTimelineStore } from '../store/timelineStore'

interface EventCardProps {
  event: Event
  index: number
}

const EventCard = ({ event, index }: EventCardProps) => {
  const { setSelectedEvent, filters } = useTimelineStore()
  const [isHovered, setIsHovered] = useState(false)

  const getImpactColor = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high': return 'bg-red-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-green-500 text-white'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-cyan-500',
      'bg-orange-500',
    ]
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  const highlightText = (text: string, search: string) => {
    if (!search) return text
    
    const regex = new RegExp(`(${search})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-1">
          {part}
        </mark>
      ) : part
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      year: date.getFullYear(),
      month: date.toLocaleDateString('en', { month: 'short' }),
      day: date.getDate()
    }
  }

  const dateInfo = formatDate(event.date)

  return (
    <div 
      className={`
        group relative bg-white rounded-2xl shadow-lg border border-gray-100
        transition-all duration-500 ease-out cursor-pointer
        hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2
        ${isHovered ? 'scale-[1.02]' : ''}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedEvent(event)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/50 rounded-2xl" />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {highlightText(event.title, filters.search)}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(event.category)}`} />
              <span className="font-medium">{event.category}</span>
            </div>
          </div>
          
          {/* Date */}
          <div className="flex-shrink-0 text-right">
            <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-blue-50 transition-colors">
              <div className="text-2xl font-bold text-gray-900">{dateInfo.day}</div>
              <div className="text-sm text-gray-500">{dateInfo.month}</div>
              <div className="text-sm font-semibold text-gray-700">{dateInfo.year}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {highlightText(event.description, filters.search)}
        </p>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg
                         group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors"
              >
                #{highlightText(tag, filters.search)}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Impact Badge */}
            <span className={`
              px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
              ${getImpactColor(event.impact)}
              shadow-lg
            `}>
              {event.impact} Impact
            </span>
            
            {/* Source */}
            {event.source && (
              <span className="text-xs text-gray-400 italic">
                via {event.source}
              </span>
            )}
          </div>

          {/* Action Button */}
          <button className="
            opacity-0 group-hover:opacity-100 transition-all duration-300
            flex items-center space-x-1 text-blue-600 hover:text-blue-700
            text-sm font-medium
          ">
            <span>Learn more</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* URL Link */}
        {event.url && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a 
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>External Link</span>
            </a>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        `} />
      </div>
    </div>
  )
}

export default EventCard 