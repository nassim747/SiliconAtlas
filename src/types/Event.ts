export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  category: string;
  impact: 'low' | 'medium' | 'high';
  tags: string[];
  source?: string;
  url?: string;
} 