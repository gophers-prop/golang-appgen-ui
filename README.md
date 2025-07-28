# Go Initializer Frontend

A modern React frontend for generating Go applications with a step-by-step wizard interface.

## Features

- **6-Step Wizard**: Go version, application types, frameworks, advanced settings, configuration, and project generation
- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn/ui components
- **Real-time Analytics**: Shows total generated project count
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional Interface**: Clean, intuitive user experience

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Backend**
   Edit `src/config/api.ts` to point to your backend:
   ```typescript
   export const API_CONFIG = {
     baseUrl: 'https://your-backend-api.com',
     // ... other config
   };
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Backend API Requirements

Your backend must implement these endpoints:

### POST /api/generate
Generate a Go project and return download URL.

**Request Body:**
```typescript
{
  goVersion: string;
  appType: string;
  framework?: string;
  docker: boolean;
  compose: boolean;
  baseImage: string;
  dependencies: string[];
  projectName: string;
  moduleName: string;
  description: string;
  author: string;
  license: string;
  // Optional advanced settings
  libraries?: string[];
  databases?: string[];
  environmentOptions?: string[];
  testingOptions?: string[];
  devopsOptions?: string[];
  monitoringOptions?: string[];
}
```

**Response:**
```typescript
{
  success: boolean;
  downloadUrl?: string;
  error?: string;
}
```

### GET /api/download/:id
Serve the generated project file as a downloadable ZIP.

### GET /api/stats
Return analytics data.

**Response:**
```typescript
{
  totalGenerated: number;
}
```

## Configuration

### Environment Variables

Create a `.env` file:
```
VITE_API_URL=https://your-backend-api.com
```

### API Configuration

Update `src/config/api.ts`:
- `baseUrl`: Your backend API URL
- `timeout`: Request timeout (default: 30 seconds)

## Project Structure

```
src/
├── components/         # UI components
│   ├── ui/            # shadcn/ui base components
│   ├── go-version-step.tsx
│   ├── app-type-step.tsx
│   ├── frameworks-step.tsx
│   ├── advanced-settings-step.tsx
│   ├── configuration-step.tsx
│   └── project-details-step.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configurations
├── pages/             # Page components
├── config/            # API and app configuration
└── main.tsx           # App entry point
```

## Application Types

The wizard supports these Go application types:

### Web Applications
- **REST API**: RESTful web services
- **Web Application**: Full-stack web apps
- **GraphQL API**: GraphQL services
- **WebSocket Server**: Real-time applications
- **gRPC Service**: High-performance RPC
- **API Gateway**: Service mesh gateway

### CLI & Tools
- **CLI Application**: Command-line tools
- **Worker/Daemon**: Background services
- **Microservice**: Distributed services

### Backend & Data
- **Database Tool**: Database utilities
- **Message Queue**: Async messaging
- **Cache Service**: Caching solutions

### Library & Other
- **Library/Package**: Reusable libraries
- **Desktop Application**: GUI applications

## Frameworks

Supports popular Go frameworks:
- **Gin**: Fast HTTP web framework
- **Echo**: High performance, minimalist framework
- **Fiber**: Express-inspired framework
- **Gorilla Mux**: Powerful HTTP router
- **Standard Library**: Built-in net/http

## Advanced Features

- **Testing**: Unit tests, integration tests, benchmarks
- **DevOps**: Docker, CI/CD, linting setup
- **Monitoring**: Health checks, metrics, logging
- **Database**: GORM, SQLx, Redis integration

## Deployment

The built application is a static site that can be deployed to:
- Vercel, Netlify, or similar platforms
- AWS S3 + CloudFront
- nginx or Apache web servers
- Any static hosting service

## License

MIT License - feel free to use in your projects!