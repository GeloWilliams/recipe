import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
        ) {}

    canActivate(): boolean | Observable<boolean | UrlTree> | UrlTree {
        return this.authService.user$.pipe(
            take(1), // take the latest only and unsubscribe quickly
             map(user => {
                const isAuth = !!user;
                if (isAuth)
                    return true;
                return this.router.createUrlTree(['/auth']);
            })
        )
    }
}