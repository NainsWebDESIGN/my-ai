import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * GET 請求
   * @param path API 路徑（不含 baseUrl），例：'/members'
   * @param params 選填 query params
   */
  get<T>(path: string, params?: Record<string, string | number>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}${path}`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /**
   * POST 請求
   */
  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT 請求
   */
  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE 請求
   */
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * 統一錯誤處理
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '發生未預期的錯誤';

    if (error.error instanceof ErrorEvent) {
      // 客戶端錯誤
      errorMessage = error.error.message;
    } else {
      // 伺服器錯誤
      errorMessage = error.error?.detail || error.error?.message || `伺服器錯誤 (${error.status})`;
    }

    console.error('[ApiService]', errorMessage, error);
    return throwError(() => ({ message: errorMessage, status: error.status, original: error }));
  }
}
