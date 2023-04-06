import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

import { User } from "./user.model";

@Injectable()

/* This interceptor manages the queryParams Firebase requires
   to authorize users */
export class AuthInterceptorService implements HttpInterceptor {

   constructor(private authService: AuthService) {}
   
   public intercept(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.authService.user$.pipe(
         take(1),
         exhaustMap(user => {
            if (user !== null) {
               if (user.token !== null) {
                  const userToken: string = user.token;
                  const modifiedReq = req.clone({params: new HttpParams().set(
                     'auth',
                     userToken
                  )});
                  return next.handle(modifiedReq);
               }
            }
            return next.handle(req);
         })
      )
   } // end intercept
} // end AuthInterceptorService