import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTimelineStore } from '../store/timelineStore'
import type { MapLocationCollection, LayerVisibility, MapLocationProperties } from '../types/MapLocation'
import mapLocations from '../data/mapLocations.json'

// Set Mapbox access token
console.log('Environment check:', {
  hasViteMapboxToken: !!import.meta.env.VITE_MAPBOX_TOKEN,
  tokenValue: import.meta.env.VITE_MAPBOX_TOKEN ? 'Set (hidden)' : 'Not set',
  fallbackToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3kifQ.rJcFIG214AriISLbB6B5aw',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE
})

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3kifQ.rJcFIG214AriISLbB6B5aw'

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const popup = useRef<mapboxgl.Popup | null>(null)
  const { isDarkMode } = useTimelineStore()
  
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    FAB: true,
    HQ: true,
    'R&D': true
  })

  const locations = mapLocations as MapLocationCollection

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 2,
      antialias: true
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add location data as source
      map.current.addSource('locations', {
        type: 'geojson',
        data: locations,
        cluster: true,
        clusterMaxZoom: 6,
        clusterRadius: 50
      })

      // Add cluster layer
      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'locations',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            5,
            '#f1c40f',
            10,
            '#e74c3c'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            15,
            5,
            20,
            10,
            25
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      })

      // Add cluster count labels
      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#fff'
        }
      })

      // Add unclustered points for each type
      const locationTypes = ['FAB', 'HQ', 'R&D'] as const
      const colors = {
        FAB: '#e74c3c',
        HQ: '#3498db',
        'R&D': '#2ecc71'
      }

      locationTypes.forEach(type => {
        map.current!.addLayer({
          id: `unclustered-point-${type}`,
          type: 'circle',
          source: 'locations',
          filter: ['all', 
            ['!', ['has', 'point_count']],
            ['==', ['get', 'type'], type]
          ],
          paint: {
            'circle-color': colors[type],
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.8
          }
        })

        // Add hover effects
        map.current!.on('mouseenter', `unclustered-point-${type}`, (e: mapboxgl.MapMouseEvent) => {
          if (!map.current || !e.features?.[0]) return
          
          map.current.getCanvas().style.cursor = 'pointer'
          
          const feature = e.features[0]
          const properties = feature.properties as MapLocationProperties
          const coordinates = (feature.geometry as any).coordinates.slice()

          // Create popup content
          if (popup.current) {
            popup.current.remove()
          }

          popup.current = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 15
          })
            .setLngLat(coordinates)
            .setHTML(`
              <div class="font-medium text-gray-900 dark:text-gray-100">
                ${properties.name}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                ${properties.company}
              </div>
            `)
            .addTo(map.current)
        })

        map.current!.on('mouseleave', `unclustered-point-${type}`, () => {
          if (!map.current) return
          
          map.current.getCanvas().style.cursor = ''
          
          if (popup.current) {
            popup.current.remove()
            popup.current = null
          }
        })

        // Add click events for detailed popup
        map.current!.on('click', `unclustered-point-${type}`, (e: mapboxgl.MapMouseEvent) => {
          if (!map.current || !e.features?.[0]) return
          
          const feature = e.features[0]
          const properties = feature.properties as MapLocationProperties
          const coordinates = (feature.geometry as any).coordinates.slice()

          // Remove existing popup
          if (popup.current) {
            popup.current.remove()
          }

          // Create detailed popup
          const popupContent = `
            <div class="p-2 min-w-[250px]">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 rounded-full" style="background-color: ${colors[type]}"></div>
                <span class="font-bold text-gray-900 dark:text-gray-100">${properties.name}</span>
              </div>
              <div class="space-y-1 text-sm">
                <div><span class="font-medium">Company:</span> ${properties.company}</div>
                <div><span class="font-medium">Type:</span> ${properties.type}</div>
                <div><span class="font-medium">Location:</span> ${properties.address}</div>
                ${properties.process_nm ? `<div><span class="font-medium">Process:</span> ${properties.process_nm}</div>` : ''}
                ${properties.status ? `<div><span class="font-medium">Status:</span> ${properties.status}</div>` : ''}
                <div class="text-gray-600 dark:text-gray-400 mt-2">${properties.description}</div>
              </div>
            </div>
          `

          popup.current = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            offset: 15
          })
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map.current)
        })
      })

      // Handle cluster clicks
      map.current.on('click', 'clusters', (e: mapboxgl.MapMouseEvent) => {
        if (!map.current || !e.features?.[0]) return
        
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
        
        const clusterId = features[0].properties?.cluster_id
        const coordinates = (features[0].geometry as any).coordinates
        
        const source = map.current.getSource('locations') as mapboxgl.GeoJSONSource
        source.getClusterExpansionZoom(clusterId, (err: any, zoom: number | null | undefined) => {
          if (err || !map.current || zoom == null) return
          
          map.current.easeTo({
            center: coordinates,
            zoom: zoom
          })
        })
      })

      // Change cursor on cluster hover
      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer'
        }
      })

      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = ''
        }
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update map style when dark mode changes
  useEffect(() => {
    if (!map.current) return
    
    const style = isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
    map.current.setStyle(style)
  }, [isDarkMode])

  // Update layer visibility
  useEffect(() => {
    if (!map.current) return

    Object.entries(layerVisibility).forEach(([type, visible]) => {
      const layerId = `unclustered-point-${type}`
      if (map.current!.getLayer(layerId)) {
        map.current!.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
      }
    })
  }, [layerVisibility])

  const toggleLayerVisibility = (type: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const getTypeColor = (type: keyof LayerVisibility) => {
    const colors = {
      FAB: 'bg-red-500',
      HQ: 'bg-blue-500',
      'R&D': 'bg-green-500'
    }
    return colors[type]
  }

  const getTypeIcon = (type: keyof LayerVisibility) => {
    const icons = {
      FAB: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      HQ: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      'R&D': (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
    return icons[type]
  }

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Floating Control Panel */}
      <div className={`absolute top-4 right-4 p-4 rounded-lg shadow-lg backdrop-blur-sm border z-10 ${isDarkMode ? 'bg-gray-800/90 border-gray-600' : 'bg-white/90 border-gray-300'}`}>
        <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Layers
        </h3>
        
        <div className="space-y-2">
          {Object.entries(layerVisibility).map(([type, visible]) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={visible}
                onChange={() => toggleLayerVisibility(type as keyof LayerVisibility)}
                className="sr-only"
              />
              <div className={`
                w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                ${visible 
                  ? `${getTypeColor(type as keyof LayerVisibility)} border-transparent` 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-300 bg-white'
                }
              `}>
                {visible && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(type as keyof LayerVisibility)}`} />
                <div className="flex items-center space-x-1">
                  {getTypeIcon(type as keyof LayerVisibility)}
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {type === 'R&D' ? 'R&D Centers' : type === 'FAB' ? 'Fabrication Plants' : 'Headquarters'}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
        
        {/* Legend */}
        <div className={`mt-4 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
          <div className="space-y-1">
            <div>• Click markers for details</div>
            <div>• Click clusters to zoom in</div>
            <div>• Hover for quick info</div>
          </div>
        </div>
      </div>

      {/* Environment Token Warning */}
      {!import.meta.env.VITE_MAPBOX_TOKEN && (
        <div className="absolute bottom-4 left-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm z-10 max-w-sm">
          <div className="font-medium">Mapbox Token Missing</div>
          <div className="text-xs mt-1">
            {import.meta.env.DEV ? (
              <>Add VITE_MAPBOX_TOKEN to your .env.local file</>
            ) : (
              <>Configure VITE_MAPBOX_TOKEN in your deployment platform's environment variables</>
            )}
          </div>
          <div className="text-xs mt-2 opacity-75">
            Mode: {import.meta.env.MODE} | Using fallback token
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveMap 