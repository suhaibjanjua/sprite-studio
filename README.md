# 🎨 SpriteStudio

A modern, professional SVG sprite viewer and management tool built with Angular 19, featuring Material Design UI, NgRx state management, and comprehensive accessibility support.

![Angular](https://img.shields.io/badge/Angular-19-red)
![Material Design](https://img.shields.io/badge/Material%20Design-Latest-blue)
![NgRx](https://img.shields.io/badge/NgRx-Latest-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

## ✨ Features

- 📁 **Dual Input Methods**: Upload SVG files or load from external URLs
- 🔗 **CORS Handling**: Automatic proxy fallback for external sprites
- 🎨 **Multiple View Modes**: Fixed size (36x36px) and actual size viewing
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🌙 **Dark Theme**: Automatic dark mode support
- ♿ **Accessibility**: Full WCAG compliance with screen reader support
- 🔄 **Real-time Updates**: Reactive state management with NgRx
- 📊 **Live Statistics**: Icon count and metadata display
- 🎯 **Performance Monitoring**: Built-in performance tracking
- 🧪 **Comprehensive Testing**: Full testing utilities and framework

## 🏗️ Architecture

### Design Patterns
- **Atomic Design**: Components organized as atoms, molecules, and organisms
- **Feature-Based Architecture**: Modular structure for scalability
- **Reactive Programming**: RxJS and NgRx for state management

### Tech Stack
- **Angular 19** with standalone components
- **Angular Material** for UI components and theming
- **NgRx** for predictable state management
- **SCSS** with responsive design patterns
- **TypeScript** with strict type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Angular CLI 19+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sprite-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 📖 Usage

### Upload Methods
1. **File Upload**: Click "Choose SVG File" to upload from your computer
2. **URL Input**: Enter an SVG sprite URL and click "Load from URL"

### View Modes
- **Fixed Size**: All icons displayed at 36x36px for consistency
- **Actual Size**: Icons shown at their original dimensions

### Supported Formats
- Standard sprites with `<symbol>` elements
- Sprites with `<defs><g>` structure
- Any SVG with identifiable icon elements

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run build:dev  # Build for development
npm test          # Run unit tests
npm run e2e       # Run end-to-end tests
npm run lint      # Run ESLint
```

### Project Structure
```
src/
├── app/
│   ├── features/sprite-studio/    # Main feature module
│   │   ├── components/            # Atomic components
│   │   ├── services/              # Business logic
│   │   ├── store/                 # NgRx state management
│   │   └── sprite-studio/         # Main container
│   ├── shared/                    # Shared utilities
│   └── core/                      # Core services
├── environments/                  # Environment configs
└── styles.scss                    # Global styles
```

### Code Standards
- Follow Angular style guide
- Use conventional commits
- Maintain 90%+ test coverage
- Ensure accessibility compliance

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

### Testing Utilities
The project includes comprehensive testing utilities in `src/app/shared/testing/`

## 🚀 Deployment

### Production Build
```bash
ng build --configuration production
```

### Environment Configuration
Configure API endpoints and features in `src/environments/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow conventional commit format
4. Add tests for new features
5. Ensure accessibility compliance
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Material Design for the beautiful UI components
- NgRx team for state management solutions
