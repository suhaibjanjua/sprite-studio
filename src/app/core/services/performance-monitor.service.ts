import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetric[] = [];
  
  /**
   * Mark the start of a performance measurement
   */
  markStart(name: string): void {
    if (!environment.devTools.showPerformanceMetrics) return;
    
    performance.mark(`${name}-start`);
  }
  
  /**
   * Mark the end of a performance measurement and calculate duration
   */
  markEnd(name: string, metadata?: Record<string, any>): number {
    if (!environment.devTools.showPerformanceMetrics) return 0;
    
    const endMark = `${name}-end`;
    const measureName = `${name}-duration`;
    
    performance.mark(endMark);
    performance.measure(measureName, `${name}-start`, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0] as PerformanceEntry;
    const duration = measure.duration;
    
    this.addMetric(name, duration, metadata);
    
    // Clean up performance entries
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
    
    return duration;
  }
  
  /**
   * Add a custom metric
   */
  addMetric(name: string, value: number, metadata?: Record<string, any>): void {
    if (!environment.devTools.showPerformanceMetrics) return;
    
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      metadata
    };
    
    this.metrics.push(metric);
    
    // Log to console if enabled
    if (environment.devTools.enableConsoleLogging) {
      console.log(`📊 Performance: ${name}`, {
        value: `${value.toFixed(2)}ms`,
        metadata
      });
    }
    
    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }
  
  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
  
  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }
  
  /**
   * Get average value for a metric
   */
  getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }
  
  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }
  
  /**
   * Measure function execution time
   */
  measure<T>(name: string, fn: () => T, metadata?: Record<string, any>): T {
    this.markStart(name);
    const result = fn();
    this.markEnd(name, metadata);
    return result;
  }
  
  /**
   * Measure async function execution time
   */
  async measureAsync<T>(
    name: string, 
    fn: () => Promise<T>, 
    metadata?: Record<string, any>
  ): Promise<T> {
    this.markStart(name);
    const result = await fn();
    this.markEnd(name, metadata);
    return result;
  }
}
