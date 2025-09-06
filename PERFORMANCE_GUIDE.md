# 📊 Performance Monitoring Guide

SpriteStudio includes comprehensive performance monitoring to help you understand how the application behaves. Here's how to access and use the performance metrics:

## 🔍 Viewing Performance Metrics

### 1. **Performance Dashboard (Visual)**
- The performance dashboard is automatically visible in development mode
- Located at the bottom of the main page
- Shows real-time metrics in a user-friendly interface
- Includes:
  - Summary cards with total measurements and averages
  - Detailed metrics table with operation timings
  - Export functionality for data analysis

### 2. **Browser Console (Real-time)**
- Open browser developer tools (F12)
- Check the console for automatic performance logging
- Look for messages starting with "📊 Performance:"
- Each operation (file upload, URL fetch, parsing) is automatically logged

### 3. **Programmatic Access**
You can access performance data programmatically in the browser console:

```javascript
// Get the SpriteStudio component instance
const component = angular.getInjector().get('SpriteStudio');

// Show performance summary
component.showPerformanceSummary();

// Get all metrics
const performanceService = angular.getInjector().get('PerformanceMonitorService');
const allMetrics = performanceService.getMetrics();
console.table(allMetrics);

// Get average for specific operations
const avgParseTime = performanceService.getAverageMetric('sprite-parse');
const avgFetchTime = performanceService.getAverageMetric('fetch');
```

## 📈 Monitored Operations

The following operations are automatically monitored:

### **File Operations**
- `file-read`: Time to read uploaded file content
- `file-sprite-parse`: Time to parse SVG sprites from files

### **URL Operations** 
- `url-fetch`: Time to fetch SVG from external URLs
- `url-sprite-parse`: Time to parse SVG sprites from URLs

### **Demo Operations**
- `demo-sprite-fetch`: Time to load demo sprite
- `demo-sprite-parse`: Time to parse demo sprite

## 🎯 Performance Benchmarks

### **Good Performance** (Green)
- **File Read**: < 50ms
- **Sprite Parse**: < 50ms  
- **URL Fetch**: < 200ms

### **Acceptable Performance** (Orange)
- **File Read**: 50-200ms
- **Sprite Parse**: 50-200ms
- **URL Fetch**: 200-1000ms

### **Slow Performance** (Red)
- **File Read**: > 200ms
- **Sprite Parse**: > 200ms
- **URL Fetch**: > 1000ms

## 🔧 Configuration

### **Enable/Disable Monitoring**
Edit `src/environments/environment.development.ts`:

```typescript
devTools: {
  enableReduxDevTools: true,
  enableConsoleLogging: true,
  showPerformanceMetrics: true  // Set to false to hide dashboard
}
```

### **Production Settings**
In production (`environment.ts`), performance monitoring is disabled by default for better performance.

## 📊 Data Export

1. Click the "Export" button in the performance dashboard
2. Downloads a JSON file with all metrics
3. Can be imported into analytics tools
4. Includes timestamps, operation types, and metadata

## 🐛 Troubleshooting

### **No Metrics Showing**
- Ensure `showPerformanceMetrics: true` in environment
- Check browser console for errors
- Try uploading a file or entering a URL to generate metrics

### **Dashboard Not Visible**
- Performance dashboard only shows in development mode
- Check that you're running `npm start` (not production build)
- Verify environment configuration

### **High Performance Times**
- Large files (>1MB) will naturally take longer
- Network latency affects URL fetch times
- Complex SVG sprites with many icons take longer to parse

## 💡 Tips for Optimization

1. **File Size**: Keep SVG sprites under 500KB for best performance
2. **Icon Count**: Large sprites (>100 icons) may show slower parse times
3. **Network**: URL fetch times depend on external server response
4. **Browser**: Performance varies between browsers and devices
