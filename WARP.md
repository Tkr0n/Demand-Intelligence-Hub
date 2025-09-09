# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Demand Intelligence Hub (DIH)** is a monorepo containing multiple technology stacks designed for ad network optimization and demand analysis. The project follows **Clean Architecture** principles with clear separation of concerns.

### Technology Stack
- **.NET** - APIs and backend services
- **Python** - ETL processes and data processing
- **React** - Frontend presentation layer (Next.js 14)

### Architecture Layers (Planned)

```
DIH/
├── DIH.Api/          # .NET Web APIs (.NET)
├── DIH.Application/  # Application services and use cases (.NET)
├── DIH.Domain/       # Domain models and business logic (.NET)
├── DIH.Infrastructure/ # Data access, external services, ETL processes (.NET/Python)
├── DIH.Presentation/ # Frontend React application (Next.js)
└── docs/             # Documentation
```

**Note**: ETL processes will be located within the Infrastructure layer, following Clean Architecture principles.

**Current Status**: Only the Presentation layer (React) is implemented. Other layers will be added progressively.

## Development Commands

### Presentation Layer (React/Next.js)

All frontend development commands should be run from the `DIH.Presentation` directory:

```bash
# Navigate to the presentation layer
cd DIH.Presentation

# Install dependencies
pnpm install

# Development server
pnpm dev

# Build the application
pnpm build

# Start production server  
pnpm start

# Run linting
pnpm lint
```

### Future Commands (When Other Layers Are Added)

```bash
# .NET API Layer (future)
cd DIH.Api
dotnet run
dotnet build
dotnet test

# Python ETL Layer (future) - Located in Infrastructure
cd DIH.Infrastructure/ETL
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py
```

### Testing Commands

Currently no test commands are configured. When adding tests:

**Frontend (React)**:
- Unit tests: `pnpm test`
- E2E tests: `pnpm test:e2e`
- Single test: `pnpm test -- ComponentName.test.tsx`

**Backend (.NET)** (future):
- Unit tests: `dotnet test`
- Integration tests: `dotnet test --filter Category=Integration`

**ETL (Python)** (future):
- Unit tests: `pytest`
- Integration tests: `pytest tests/integration/`

### GCP Deployment Commands (Future)

```bash
# Deploy Cloud Run services
gcloud run deploy dih-api --source DIH.Api
gcloud run deploy dih-presentation --source DIH.Presentation

# Build with Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Deploy ETL jobs to Cloud Functions/Cloud Run
gcloud functions deploy dih-etl-ironsource --runtime python39
gcloud functions deploy dih-etl-admob --runtime python39
gcloud functions deploy dih-etl-applovin --runtime python39
```

## Current Architecture

### Presentation Layer (DIH.Presentation)

Currently implemented as a **Next.js 14 application** with TypeScript and React, serving as the frontend for the Demand Intelligence Hub.

### Core Domain Concepts

The application models advertising demand intelligence with these key entities:

- **Ad Networks** (`AdNetwork`): Focus on IronSource, AdMob, and AppLovin networks
- **Ad Formats** (`AdFormat`): Different ad types (banners, interstitials, rewarded video, native)
- **Geographies** (`Geography`): Regional targeting for ads
- **Demand Rules** (`DemandRule`): Business logic for network selection based on conditions
- **Simulation Engine**: Tools for predicting network performance
- **Metrics Collection**: Daily retrieval of eCPM, FillRate, Revenue, CTR, and Impressions
- **Data Storage**: BigQuery on GCP for all metrics and analytics data

### Application Layers

**Navigation Structure**:
- Root (`/`) → Redirects to `/demand-hub`
- **Demand Intelligence**: `/demand-hub/*` - Main dashboard and analytics
- **Security**: `/security/*` - User permissions and access control

**Component Architecture**:
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components (primarily shadcn/ui based)
- `types/` - TypeScript type definitions for domain models
- `services/` - API service layer (currently mock implementations)
- `hooks/` - Custom React hooks for data fetching and state management
- `lib/` - Utility functions and mock data

### Data Flow Pattern

The application follows a **React Query + Service Layer** pattern:

1. **Custom Hooks** (`hooks/use-*.ts`) use React Query for data fetching
2. **Service Layer** (`services/*-api.ts`) handles API calls (currently mocked)
3. **Components** consume data via custom hooks
4. **Types** (`types/*.ts`) define the data contracts

Example pattern:
```typescript
// Component uses hook
const { data: users, isLoading } = useUsers()

// Hook uses service via React Query
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers
  })
}

// Service handles API call
export const usersApi = {
  getUsers: async (): Promise<User[]> => { /* implementation */ }
}
```

### State Management

- **React Query** for server state and caching
- **React State** (useState, useReducer) for local component state
- **Next.js Navigation** for routing state
- **Theme Provider** for dark/light mode state

### UI Component System

Built on **shadcn/ui** components with **Tailwind CSS**:
- Design system uses CSS custom properties for theming
- Components are in `components/ui/` (auto-generated)
- Custom business components in `components/` root
- **Radix UI** primitives provide accessibility foundation

## Key File Locations

### Configuration Files
- `package.json` - Dependencies and scripts
- `next.config.mjs` - Next.js configuration (build errors ignored)
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `tsconfig.json` - TypeScript configuration with path aliases

### Core Application Files
- `app/layout.tsx` - Root layout with theme provider
- `app/ClientLayout.tsx` - Client-side layout components
- `app/demand-hub/page.tsx` - Main dashboard page
- `components/demand-hub-page.tsx` - Primary dashboard component
- `components/sidebar-content.tsx` - Navigation structure

### Domain Models
- `types/demand-intelligence.ts` - Core ad network and rules types
- `types/demand.ts` - User and permission types
- `lib/mock-data.ts` - Mock data for development

## Development Notes

### Mock Data System
The application currently uses mock data throughout. All services in `services/` return simulated data with artificial delays to mimic real API calls. When implementing real APIs:

1. Replace service implementations in `services/*-api.ts`
2. Update type definitions if needed in `types/*.ts`
3. React Query hooks will automatically work with real data

### Component Patterns
- Most components are client-side (`"use client"` directive)
- Form handling uses React Hook Form with Zod validation
- Data fetching uses React Query hooks
- UI state managed with React state hooks

### Styling Approach
- Utility-first with Tailwind CSS
- CSS custom properties for theming (`hsl(var(--primary))`)
- Responsive design with mobile-first approach
- Dark/light mode support built-in

### Path Aliases
The project uses `@/*` path aliases pointing to the presentation root directory, so imports look like:
```typescript
import { Button } from "@/components/ui/button"
import { mockNetworks } from "@/lib/mock-data"
```

## Business Context

This application is designed for **ad network optimization**. The core workflow involves:

1. **Configuration**: Setting up demand rules based on geography, ad format, and eCPM targets
2. **Simulation**: Running "what-if" scenarios to predict network performance
3. **Analytics**: Monitoring actual performance across different networks and regions
4. **Optimization**: Adjusting rules based on performance data to maximize revenue

The main users are likely ad operations teams who need to optimize advertising revenue across multiple networks and regions.
