import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

/* Component Decorator */
@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html'
})

export class AuthComponent {

   // inject AuthService & Router upon instantiation
   constructor(
      private authService: AuthService,
      private router: Router) {}

   /* DATA MEMBERS: isLoginMode, isLoading, errorMsg */
   public isLoginMode = true;
   public isLoading = false;
   public errorMsg: string | null = null;

   /* OPERATION: onSwitchMode
         -- toggles isLoginMode property */
   public onSwitchMode(): void {
      this.isLoginMode = !this.isLoginMode;
   } // end onSwitchMode

   /* OPERATION: onSubmit:
         @param form: the NgForm imported from the template
         -- configures the functionality for type='submit' */
   public onSubmit(form: NgForm): void {
      // for devs who manually hack the disable button validation via dev tools (in the template):
      if (!form.valid) return;

      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;

      // Store either signup or login response data in this observable:
      let authObs: Observable<AuthResponseData>;

      if (this.isLoginMode) {
         authObs = this.authService.login(email, password);
      } else {
         authObs = this.authService.signup(email, password);
      }

      // don't forget to subscribe to request body observables
      authObs.subscribe({
         error: err => {
            this.errorMsg = err;
            this.isLoading = false;
         },
         complete: () => {
            this.isLoading = false;
            this.router.navigate(['./recipes']);
         }
      });
      
      // clear form after submission
      form.reset();
   } // end onSubmit

} // end AuthComponent