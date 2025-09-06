export const environment = {
  production: true,
  name: 'production',
  version: '1.0.5',
  buildNumber: '1757193958708',
  buildTime: '2025-09-06T21:25:58.708Z',
  
  // API Configuration
  api: {
    corsProxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 15000, // 15 seconds for production
    retryAttempts: 2
  },
  
  // Feature Flags
  features: {
    enableDemoSprite: true,
    enableLocalStorage: true,
    enableAdvancedParsing: true,
    enableErrorLogging: false // Disable in production
  },
  
  // UI Configuration
  ui: {
    maxFileSize: 5 * 1024 * 1024, // 5MB for production
    supportedFormats: ['.svg', 'image/svg+xml'],
    maxIconsDisplay: 500, // Lower limit for production performance
    defaultViewMode: 'actual' as const
  },
  
  // Development Tools
  devTools: {
    enableReduxDevTools: false,
    enableConsoleLogging: false,
    showPerformanceMetrics: false
  }
};
