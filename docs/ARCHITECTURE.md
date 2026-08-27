# Architecture: Khmer Heritage

## 1. System Philosophy
- **Unified Core & UI**: TypeScript + React for shared business logic, UI components, and data fetching services.
- **Cross-Platform Strategy**:
  - **Core Application**: React + TypeScript + Vite.
  - **Mobile Strategy**: Capacitor or Web-standard container enabling seamless export to native Android Studio (Gradle / APK) and iOS Xcode projects while preserving single-codebase velocity.
  - **Web Strategy**: Static Web SPA / PWA hosted via standard CDN with direct R2 asset delivery.
- **Data & Content Architecture**:
  - Decoupled content distribution: Structured JSON files + media stored on Cloudflare R2 CDN.
  - Client applications (Web, Android, iOS) fetch read-only versioned manifests and entries.

## 2. Directory Structure (Standard Monorepo / Shared Client Foundation)
```text
├── docs/                     # Architectural specifications and AI Bridge logs
├── public/                   # Static assets, fallback icons, and manifests
├── src/
│   ├── core/                 # Shared data contracts, schema validators, constants
│   ├── types/                # TypeScript interfaces (Content, Media, License, Relations)
│   ├── services/             # Data fetching abstractions (R2 provider, cache manager)
│   ├── components/           # UI components (Pragmatic design, UI elements)
│   ├── App.tsx               # Main entry view
│   ├── index.css             # Tailwind styling configuration
│   └── main.tsx              # Application bootstrap
├── package.json              # Dependencies and scripts
└── vite.config.ts            # Build system configuration
```

## 3. Technology Stack Decisions
- **Language**: TypeScript 5.8+ (Strict type safety).
- **Core Library**: React 19.
- **Styling**: Tailwind CSS.
- **Build System**: Vite.
- **Icons**: Lucide React.
- **Animations / Transitions**: Motion (Framer Motion compatible).

## 4. Known Constraints
- **No Unsolicited Databases**: No Firebase, Supabase, PostgreSQL, MongoDB, or D1 in this phase.
- **No Complex Server Backend**: Focus on client applications consuming static/CDN-hosted structured JSON from R2.

## 5. Open Decisions
- [TODO / PENDING DECISION] Capacitor version and native mobile plugin set (e.g., Filesystem, Network status, Deep Links).
- [TODO / PENDING DECISION] State management library (React Context vs Zustand for local app state).
- [TODO / PENDING DECISION] Content hydration & localized caching mechanism (IndexedDB vs SQLite via Capacitor).
