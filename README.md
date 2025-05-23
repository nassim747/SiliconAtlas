# Silicon Atlas

## About

I finished reading Chip War and I absolutely loved it. So I told myself why not do a project that is related to that? It also kinda served as a way for me to summarize in my head some of the most important parts of the book. 

For now it's only a very incomplete timeline, which I intend to extend. I'll also make an interactive map that will (hopefully) help people outside of this industry to realize how much globalized the semiconductor supply chain is. Reading about it on the Financial Times and Wall Street Journal is not the same as actually seeing it on a map.

I'll also probably make a blog section where I'll yap about semiconductors. Hopefully I'll get even more ideas to extend the project while doing so. 

## 🚀 Features

- **Interactive Timeline View**: Navigate through technological history with a beautiful animated timeline
- **Multiple View Modes**: Switch between timeline, grid, and list views
- **Advanced Search & Filtering**: Search events by title, description, or filter by categories and impact level
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Polished user experience with smooth transitions and micro-interactions
- **Event Details Modal**: Deep-dive into specific events with detailed information
- **Dynamic Search Bar**: Auto-hiding search bar based on scroll behavior

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React version with modern features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool and development server

### State Management & Data
- **Zustand** - Lightweight state management solution
- **JSON Data** - Static event data (ready for API integration)

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom CSS** - Additional styling for animations and effects
- **Responsive Design** - Mobile-first approach

### Data Visualization (Ready)
- **D3.js** - Powerful data visualization library
- **Visx** - React-specific D3 components

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Testing (Configured)
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Jest DOM** - Custom Jest matchers

## 📁 Project Structure (will probably look horrendous needs to look after the formatting)
src/
├── components/ # Reusable UI components
│ ├── Timeline.tsx # Main timeline component
│ ├── EventCard.tsx # Individual event display
│ ├── SearchBar.tsx # Search functionality
│ ├── FilterPanel.tsx # Filtering controls
│ └── index.ts # Component exports
├── store/ # State management
│ └── timelineStore.ts # Zustand store configuration
├── data/ # Static data files
│ ├── events.json # Event data
│ └── index.ts # Data exports
├── types/ # TypeScript type definitions
│ └── Event.ts # Event interface
├── hooks/ # Custom React hooks
├── pages/ # Page components (ready for routing)
├── assets/ # Static assets
├── App.tsx # Main application component
└── main.tsx # Application entry point


## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nassim747/SiliconAtlas.git
   cd SiliconAtlas
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests with Vitest
```

## Build & Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

## Testing

The project includes a comprehensive testing setup:

```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:ui     # Run tests with UI
```

## Configuration

### TypeScript Configuration
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

## Customization

### Adding New Events
Edit `src/data/events.json` to add new events:

```json
{
  "id": "unique-id",
  "title": "Event Title", 
  "description": "Event description",
  "date": "YYYY-MM-DD",
  "category": "Category",
  "impact": "low|medium|high",
  "tags": ["tag1", "tag2"],
  "source": "Source Name",
  "url": "https://example.com"
}
```

### Styling
- Tailwind classes can be customized in `tailwind.config.js`
- Custom CSS can be added to component files or `src/index.css`


## 👨‍💻 Author

**Nassim Ameur**
- LinkedIn: [Nassim Ameur](https://www.linkedin.com/in/nassim-a-265944286/)
- GitHub: [@nassim747](https://github.com/nassim747)

---
