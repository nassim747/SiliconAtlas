export interface PathwayNode {
  id: string
  name: string
  company: string
  type: 'design' | 'fab' | 'packaging' | 'assembly'
  lat: number
  lng: number
  country: string
  process_nm?: number
  source?: string
}

export interface PathwayFlow {
  from: string
  to: string
  label: string
}

export interface PathwayData {
  nodes: PathwayNode[]
  flows: PathwayFlow[]
}

export interface PathwayOption {
  id: string
  name: string
  data: PathwayData
} 