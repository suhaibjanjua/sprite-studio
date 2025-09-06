import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(environment.api.timeout),
      retry(environment.api.retryAttempts),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 0:
              errorMessage = 'Network error - please check your connection';
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 403:
              errorMessage = 'Access forbidden - CORS or permission issue';
              break;
            case 500:
              errorMessage = 'Server error - please try again later';
              break;
            default:
              errorMessage = `Server Error: ${error.status} - ${error.message}`;
          }
        }
        
        if (environment.features.enableErrorLogging) {
          console.error('HTTP Error:', {
            url: req.url,
            method: req.method,
            status: error.status,
            message: errorMessage,
            timestamp: new Date().toISOString()
          });
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
