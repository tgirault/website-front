import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

// tslint:disable-next-line:max-line-length
const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const authdata = 'dXNlcjpwYXNzdzByZA==';
    if (authdata) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authdata}`
        }
      });
    }

    return next.handle(request);
  }
}
