import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

/* Component Decorator */
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      // runs early in the app to check browser local storage
      this.authService.autoLogin();
   }

}
