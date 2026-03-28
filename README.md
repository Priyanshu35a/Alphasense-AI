# Alphasense AI

A modern React application built with Vite, TypeScript, and ShadCN UI components for AI-powered financial analysis and market insights.

## Features

- Real-time market data and tickers
- AI-powered sentiment analysis for news
- Interactive charts and portfolio tracking
- Responsive design with Tailwind CSS
- Comprehensive UI component library

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alphasense-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and mock data
├── pages/              # Page components
└── test/               # Test files
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **Radix UI** - Accessible UI primitives
- **Vitest** - Testing framework
- **Playwright** - End-to-end testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Submit a pull request

## License

This project is private and proprietary.