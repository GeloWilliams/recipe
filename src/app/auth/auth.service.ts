import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

import { User } from "./user.model";


/* INTERFACE: AuthResponseData
   - based on the response payload outlined in the Firebase REST API docs 
   - optionally created as good practice that defines the data we are working with
   - allows us to explicitly define what we are expecting back from the request
   - export keyword allows this interface to be public or open for use in 
     other components(must be imported separately from or alongside AuthService) */
export interface AuthResponseData {
   kind: string, 
   idToken: string,
   email: string,
   refreshToken: string,
   expiresIn: string,
   localId: string,
   registered?: boolean
}

/* Service Decorator */
@Injectable({providedIn: 'root'})

export class AuthService {

   // inject the HttpClient service, Router upon instantiation
   constructor(
      private http: HttpClient,
      private router: Router) {}

   /* DATA MEMBER: user$ Behavior Subject
     -- nexts a new User when login runs
     -- nexts an empty User when logout runs
     -- being a BehaviorSubject, we have immediate access
        to the previous value */
   public user$ = new BehaviorSubject<User | null>(null);

   /* DATA MEMBER: userToken
      -- allows for 'on-demand' access to current User's token */
   public userToken!: string;

   private tokenExpirationTimer: any;

   /* OPERATION: signup
         @param eml: the email address to be checked
         @param pwd: the password to be checked
         @return:    an Observable in the form of AuthResponseData
         -- Hits the Firebase DB endpoint for email creation
         -- If credentials are invalid, an error message is displayed */
   public signup(eml: string, pwd: string): Observable<AuthResponseData> {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTok9vx6CfjkEpohP8AzWFVpJtW--xZi4', 
      {
         email: eml,
         password: pwd,
         returnSecureToken: true
      }).pipe(
         catchError(this.handleError),
         tap(res => {
            // create user from response data
            const user = this.handleLogin(res);

            // lock in the current user:
            this.user$.next(user);
         }),
      );
   } // end signup

   /* OPERATION: login
      @param eml: the email address to be checked
      @param pwd: the password to be checked
      @return:    an Observable in the form of AuthResponseData
      -- Hits the Firebase DB endpoint for email authorization
      -- If credentials are invalid, an error message is displayed */
   public login(eml: string, pwd: string): Observable<AuthResponseData> {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTok9vx6CfjkEpohP8AzWFVpJtW--xZi4',
      {
         email: eml,
         password: pwd,
         returnSecureToken: true
      }).pipe(
         catchError(this.handleError),
         tap(res => {
            // create user from response data
            const user = this.handleLogin(res);

            // lock in the current user:
            this.user$.next(user);
         })
      );
   } // end login

   /* OPERATION: handleLogin
   @param res: the response body from Firebase endpoints
   @return:    a new User object
   -- shapes and then returns a new user from the data received from 
      Firebase endpoints */
      public handleLogin(res: AuthResponseData): User {
         const curTime = new Date().getTime(); // get current time in milliseconds
         // res.expiresIn is a string representing the number of seconds until expiration
         const exprTime = (+res.expiresIn * 1000);
         const expirationDate = new Date(curTime + exprTime); // converts to a Date timestamp
         
         const user = new User(res.email, res.localId, res.idToken, expirationDate);
         // use browser's localStorage API; stringify to serialize the JS Object
         localStorage.setItem('userData', JSON.stringify(user));

         // start autoLogout timer
         this.autoLogout(exprTime);
         return user;
   } // end handleLogin

   /* OPERATION: logout
      -- treats the user as unauthenticated
      -- redirects the user to the Auth screen */
   public logout(): void {
      this.user$.next(null);
      this.router.navigate(['/auth']);
      // clear out user data in local storage
      localStorage.removeItem('userData');

      // check if our autoLogout timer is active
      if (this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer);
         this.tokenExpirationTimer = null;
      }
   } // end logout

   /* OPERATION: handleError
      @param errorRes: the response error, can be implicitly passed via rxjs's catchError
      -- central place for handling errors
      -- returns 'Observable<never>' since this Observer only emits an error */
   private handleError(errorRes: HttpErrorResponse): Observable<never> {
      let errorMsg = 'Man... some error happened!';

      // check if the error format matches Firebase's
      if (!errorRes.error || !errorRes.error.error)
         return throwError(() => new Error(errorMsg));
      switch(errorRes.error.error.message) {
         case 'EMAIL_EXISTS':
            errorMsg = 'smdh... Now you know this email already exists...';
            break;
         case 'INVALID_EMAIL':
            errorMsg = 'This email is invalid. You really should check your syntax!';
            break;
         case 'INVALID_PASSWORD':
            errorMsg = 'Wrong password bruh. Try again.';
            break;
         case 'EMAIL_NOT_FOUND':
            errorMsg = 'I uh... don\'t see this email anywhere. Guess it\'s not found.';
            break;
      }
      return throwError(() => new Error(errorMsg));
   } // end handleError

   /* OPERATION: autoLogin
      -- retrieves user data from local storage */
   public autoLogin(): void {
      const obj: string | null = localStorage.getItem('userData')
      if (obj) {
         // unstringify, put back into a User object
         const userData: User = JSON.parse(obj);
         // pass data
         const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
         );

         // check if token is truish
         if (loadedUser.token) {
            this.user$.next(loadedUser);
            // set autoLogout timer
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
            new Date().getTime()
            this.autoLogout(expirationDuration);
         }
      }
   } // end autoLogin

   public autoLogout(expirationDuration: number): void {
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

} // end AuthService