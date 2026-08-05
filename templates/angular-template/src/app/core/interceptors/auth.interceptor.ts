import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 取得 token（可依專案需求調整來源：localStorage / sessionStorage / Cookie）
    const authKey = localStorage.getItem('authKey') || '';

    // Clone request 並附加 auth header
    const authReq = req.clone({
      setHeaders: authKey ? { Authorization: `Bearer ${authKey}` } : {}
    });

    return next.handle(authReq);
  }
}
