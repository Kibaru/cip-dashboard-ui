import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("Interceptor Running.");
    // Get the auth token from the service.
    if (sessionStorage.getItem('token') != null) {
      // console.log("Access Token Found");
      const authToken = sessionStorage.getItem('token')!;

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authReq);
    }else{
       this.router.navigate(['/login']);
      //  return;
    }
    return next.handle(request);




  }
}
