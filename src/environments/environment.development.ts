export const environment = {
  production: false,
  name: 'development',
  version: '1.0.3',
  buildNumber: '1757193466944',
  buildTime: '2025-09-06T21:17:46.944Z',
  
  // API Configuration
  api: {
    corsProxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 10000, // 10 seconds
    retryAttempts: 3
  },
  
  // Feature Flags
  features: {
    enableDemoSprite: true,
    enableLocalStorage: true,
    enableAdvancedParsing: true,
    enableErrorLogging: true
  },
  
  // UI Configuration
  ui: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['.svg', 'image/svg+xml'],
    maxIconsDisplay: 1000,
    defaultViewMode: 'actual' as const
  },
  
  // Development Tools
  devTools: {
    enableReduxDevTools: true,
    enableConsoleLogging: true,
    showPerformanceMetrics: true
  }
};
