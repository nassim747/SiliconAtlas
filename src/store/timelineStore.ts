import { create } from 'zustand'
import type { Event } from '../types/Event'

export interface TimelineFilters {
  search: string
  categories: string[]
  impact: ('low' | 'medium' | 'high')[]
  dateRange: {
    start?: string
    end?: string
  }
}

export interface TimelineState {
  // Data
  events: Event[]
  filteredEvents: Event[]
  
  // Filters
  filters: TimelineFilters
  
  // UI State
  viewMode: 'timeline' | 'grid' | 'list'
  isSearchFocused: boolean
  selectedEvent: Event | null
  isDarkMode: boolean
  
  // Actions
  setEvents: (events: Event[]) => void
  setSearch: (search: string) => void
  toggleCategory: (category: string) => void
  toggleImpact: (impact: 'low' | 'medium' | 'high') => void
  setDateRange: (start?: string, end?: string) => void
  clearFilters: () => void
  setViewMode: (mode: 'timeline' | 'grid' | 'list') => void
  setSearchFocused: (focused: boolean) => void
  setSelectedEvent: (event: Event | null) => void
  toggleDarkMode: () => void
  filterEvents: () => void
}

const initialFilters: TimelineFilters = {
  search: '',
  categories: [],
  impact: [],
  dateRange: {}
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  // Initial state
  events: [],
  filteredEvents: [],
  filters: initialFilters,
  viewMode: 'timeline',
  isSearchFocused: false,
  selectedEvent: null,
  isDarkMode: false,

  // Actions
  setEvents: (events) => {
    set({ events })
    get().filterEvents()
  },

  setSearch: (search) => {
    set(state => ({
      filters: { ...state.filters, search }
    }))
    get().filterEvents()
  },

  toggleCategory: (category) => {
    set(state => {
      const categories = state.filters.categories.includes(category)
        ? state.filters.categories.filter(c => c !== category)
        : [...state.filters.categories, category]
      return {
        filters: { ...state.filters, categories }
      }
    })
    get().filterEvents()
  },

  toggleImpact: (impact) => {
    set(state => {
      const impacts = state.filters.impact.includes(impact)
        ? state.filters.impact.filter(i => i !== impact)
        : [...state.filters.impact, impact]
      return {
        filters: { ...state.filters, impact: impacts }
      }
    })
    get().filterEvents()
  },

  setDateRange: (start, end) => {
    set(state => ({
      filters: { 
        ...state.filters, 
        dateRange: { start, end }
      }
    }))
    get().filterEvents()
  },

  clearFilters: () => {
    set({ filters: initialFilters })
    get().filterEvents()
  },

  setViewMode: (viewMode) => set({ viewMode }),

  setSearchFocused: (isSearchFocused) => set({ isSearchFocused }),

  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),

  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),

  filterEvents: () => {
    const { events, filters } = get()
    
    let filtered = events.filter(event => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.tags.some(tag => tag.toLowerCase().includes(searchLower))
        
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(event.category)) return false
      }

      // Impact filter
      if (filters.impact.length > 0) {
        if (!filters.impact.includes(event.impact)) return false
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const eventDate = new Date(event.date)
        
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start)
          if (eventDate < startDate) return false
        }
        
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end)
          if (eventDate > endDate) return false
        }
      }

      return true
    })

    // Sort by date (newest first by default)
    filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    set({ filteredEvents: filtered })
  }
})) 