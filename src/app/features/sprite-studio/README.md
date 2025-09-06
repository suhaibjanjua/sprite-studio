# SpriteStudio Feature Module

A comprehensive Angular feature module for viewing and managing SVG sprites with modern Material Design UI.

## Architecture

This module follows **Atomic Design** and **Feature-Based Architecture** patterns:

### Components (Atomic Design)

#### Atoms
- Individual form inputs and buttons
- Basic Material Design elements

#### Molecules  
- `upload-form/` - File upload and URL input form
- `icon-toggle/` - View mode toggle component

#### Organisms
- `sprite-viewer-grid/` - Complete icon display grid
- `sprite-studio/` - Main feature container

### Services
- `sprite-parser.ts` - SVG sprite parsing and icon extraction
- `svg-fetch.service.ts` - CORS-safe external SVG fetching
- `sprite-storage.ts` - Local storage management

### State Management (NgRx)
- `store/icons.*` - Icon collection state management
- `store/view-mode.*` - View mode preferences state

## Features

- 📁 **File Upload**: Drag & drop SVG sprite files
- 🔗 **URL Import**: Load sprites from external URLs with CORS handling
- 🎨 **Multiple View Modes**: Fixed size (36x36px) and actual size viewing
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Theme**: Automatic dark theme support
- 🔄 **Real-time Updates**: Reactive state management with NgRx
- 📊 **Statistics**: Live icon count and metadata display

## Usage

The module is automatically loaded via routing. Simply navigate to the app root to access SpriteStudio.

### Supported SVG Formats

- Standard sprite with `<symbol>` elements
- Sprites with `<defs><g>` structure  
- Any SVG with identifiable icon elements
- External sprites with CORS proxy fallback

## Technical Implementation

- **Angular 19** with standalone components
- **Angular Material** for UI components
- **NgRx** for state management  
- **SCSS** with responsive design patterns
- **TypeScript** with strict type checking
