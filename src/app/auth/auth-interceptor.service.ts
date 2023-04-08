import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

import { User } from "./user.model";

/* Service Decorator */
@Injectable()

/* This interceptor manages the queryParams Firebase requires
   to authorize users */
export class AuthInterceptorService implements HttpInterceptor {

   /* Inject AuthService upon instantiation */
   constructor(private authService: AuthService) {}
   
   /* OPERATION (required): intercept
      @param req:  User model sent as the request body data
      @param next: HttpHandler that intercepts the original body request
                   value and passes a modified value instead
      @return:     Observable in the form of an HttpEvent; allows for the
                   continuation of request sending
      -- required method when implementing the HttpInterceptor interface
      -- handles the functionality of modified request data
   */
   public intercept(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.authService.user$.pipe(
         // take one Observable emission and immediately unsubscribe
         take(1),
         // exhaustMap allows subscription activity within and only within an outer subscription
         exhaustMap(user => {
            if (user !== null) {
               if (user.token !== null) {
                  const userToken: string = user.token;
                  // use HttpParams to set query params
                  const modifiedReq = req.clone({params: new HttpParams().set(
                     'auth',
                     userToken
                  )});
                  // pass the modified request
                  return next.handle(modifiedReq);
               }
            }
            return next.handle(req);
         })
      )
   } // end intercept
} // end AuthInterceptorService