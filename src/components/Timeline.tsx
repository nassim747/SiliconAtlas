import type { Event } from '../types/Event'
import eventsData from '../data/events.json'

const Timeline = () => {
  const events: Event[] = eventsData as Event[]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Technology Timeline
      </h2>
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {event.category}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                event.impact === 'high' 
                  ? 'bg-red-100 text-red-800'
                  : event.impact === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {event.impact} impact
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline 