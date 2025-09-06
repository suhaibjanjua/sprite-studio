# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-07

### Added
- **Core Features**
  - SVG sprite file upload with drag & drop support
  - External URL loading with CORS proxy fallback
  - Dual view modes: Fixed size (36x36px) and actual size
  - Real-time icon count and statistics display
  - Demo sprite auto-loading for immediate functionality showcase

- **Architecture**
  - Angular 19 with standalone components
  - NgRx state management for icons and view preferences
  - Atomic Design pattern (atoms, molecules, organisms)
  - Feature-based architecture for scalability
  - TypeScript strict mode with comprehensive type checking

- **UI/UX**
  - Material Design components and theming
  - Responsive design for desktop and mobile
  - Dark theme support with prefers-color-scheme
  - Custom gradient-based visual design
  - Hover effects and smooth transitions

- **Accessibility**
  - WCAG compliance with ARIA labels and descriptions
  - Screen reader announcements for state changes
  - Keyboard navigation support
  - Focus management and trap utilities
  - High contrast support

- **Performance**
  - Lazy loading and tree shaking
  - Performance monitoring service
  - Bundle analysis tools
  - Optimized builds for production
  - Memory management for large sprite files

- **Developer Experience**
  - Comprehensive testing utilities
  - Error handling and interceptors
  - Environment-based configuration
  - Conventional commit standards
  - Documentation and code guidelines

- **Security**
  - SVG content sanitization
  - Input validation for files and URLs
  - CORS handling with proxy fallback
  - XSS protection measures

### Technical Implementation
- **Components**: Upload form, icon toggle, sprite viewer grid
- **Services**: Sprite parser, SVG fetch, performance monitor
- **State Management**: Icons reducer, view mode reducer
- **Utilities**: SVG handling, accessibility, testing helpers
- **Styling**: SCSS with responsive breakpoints and dark theme

### Supported SVG Formats
- Standard sprites with `<symbol>` elements
- Sprites with `<defs><g>` structure  
- Any SVG with identifiable icon elements
- External sprites with CORS restrictions

## [0.1.0] - Initial Setup
- Project scaffolding with Angular CLI
- Basic component structure
- Initial routing configuration
