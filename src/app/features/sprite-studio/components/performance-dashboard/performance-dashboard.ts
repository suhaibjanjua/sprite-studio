import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PerformanceMonitorService } from '../../../../core/services/performance-monitor.service';
import { environment } from '../../../../../environments/environment';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

@Component({
  selector: 'app-performance-dashboard',
  template: `
    <mat-card *ngIf="showMetrics" class="performance-dashboard">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>speed</mat-icon>
          Performance Metrics
        </mat-card-title>
        <mat-card-subtitle>Real-time application performance monitoring</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="metrics-summary">
          <div class="metric-item">
            <span class="metric-label">Total Measurements:</span>
            <span class="metric-value">{{ allMetrics.length }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Average Parse Time:</span>
            <span class="metric-value">{{ getAverageParseTime() }}ms</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Average Fetch Time:</span>
            <span class="metric-value">{{ getAverageFetchTime() }}ms</span>
          </div>
        </div>

        <mat-expansion-panel class="metrics-details">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <mat-icon>analytics</mat-icon>
              Detailed Metrics
            </mat-panel-title>
          </mat-expansion-panel-header>
          
          <div class="metrics-table">
            <table mat-table [dataSource]="recentMetrics" class="metrics-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Operation</th>
                <td mat-cell *matCellDef="let metric">{{ formatMetricName(metric.name) }}</td>
              </ng-container>

              <ng-container matColumnDef="value">
                <th mat-header-cell *matHeaderCellDef>Duration</th>
                <td mat-cell *matCellDef="let metric">
                  <span [class]="getPerformanceClass(metric.value)">
                    {{ metric.value.toFixed(2) }}ms
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>Time</th>
                <td mat-cell *matCellDef="let metric">{{ formatTimestamp(metric.timestamp) }}</td>
              </ng-container>

              <ng-container matColumnDef="metadata">
                <th mat-header-cell *matHeaderCellDef>Details</th>
                <td mat-cell *matCellDef="let metric">
                  <span *ngIf="metric.metadata" class="metadata">
                    {{ formatMetadata(metric.metadata) }}
                  </span>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-expansion-panel>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="refreshMetrics()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
          <button mat-raised-button (click)="clearMetrics()">
            <mat-icon>clear_all</mat-icon>
            Clear All
          </button>
          <button mat-raised-button (click)="exportMetrics()">
            <mat-icon>download</mat-icon>
            Export
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './performance-dashboard.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule
  ]
})
export class PerformanceDashboard implements OnInit {
  showMetrics = environment.devTools.showPerformanceMetrics;
  allMetrics: PerformanceMetric[] = [];
  recentMetrics: PerformanceMetric[] = [];
  displayedColumns: string[] = ['name', 'value', 'timestamp', 'metadata'];

  constructor(private performanceMonitor: PerformanceMonitorService) {}

  ngOnInit() {
    this.refreshMetrics();
    // Auto-refresh every 5 seconds
    setInterval(() => this.refreshMetrics(), 5000);
  }

  refreshMetrics() {
    this.allMetrics = this.performanceMonitor.getMetrics();
    this.recentMetrics = this.allMetrics.slice(-10).reverse(); // Show last 10 metrics
  }

  clearMetrics() {
    this.performanceMonitor.clearMetrics();
    this.refreshMetrics();
  }

  exportMetrics() {
    const data = JSON.stringify(this.allMetrics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-metrics-${new Date().toISOString()}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  getAverageParseTime(): string {
    const parseMetrics = this.allMetrics.filter(m => m.name.includes('parse'));
    if (parseMetrics.length === 0) return '0.00';
    const avg = parseMetrics.reduce((sum, m) => sum + m.value, 0) / parseMetrics.length;
    return avg.toFixed(2);
  }

  getAverageFetchTime(): string {
    const fetchMetrics = this.allMetrics.filter(m => m.name.includes('fetch'));
    if (fetchMetrics.length === 0) return '0.00';
    const avg = fetchMetrics.reduce((sum, m) => sum + m.value, 0) / fetchMetrics.length;
    return avg.toFixed(2);
  }

  formatMetricName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  formatMetadata(metadata: Record<string, any>): string {
    return Object.entries(metadata)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }

  getPerformanceClass(value: number): string {
    if (value < 50) return 'performance-good';
    if (value < 200) return 'performance-ok';
    return 'performance-slow';
  }
}
