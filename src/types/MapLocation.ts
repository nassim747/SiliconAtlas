export interface MapLocationProperties {
  id: string
  name: string
  company: string
  type: 'FAB' | 'HQ' | 'R&D'
  address: string
  description: string
  process_nm?: string
  status?: string
}

export interface MapLocation {
  type: 'Feature'
  properties: MapLocationProperties
  geometry: {
    type: 'Point'
    coordinates: [number, number] // [lng, lat]
  }
}

export interface MapLocationCollection {
  type: 'FeatureCollection'
  features: MapLocation[]
}

export interface LayerVisibility {
  FAB: boolean
  HQ: boolean
  'R&D': boolean
} 