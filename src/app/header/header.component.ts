import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


/* Component Decorator */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

   /* Inject DataStorargeService, AuthService, Router upon instantiation */
   constructor(
      private dataStorageService: DataStorageService,
      private authService: AuthService,
      private router: Router) {}

   /* DATA MEMBER: userSubscription 
      -- keeps track of which users (if any) are being next-ed */
   private userSubscription!: Subscription;

   /* DATA MEMBER: validUser */
   public validUser: boolean = false;

   ngOnInit(): void {
      // subscribe to user Subject
      this.userSubscription = this.authService.user$.subscribe(user => {
         this.validUser = !!user; // shortcut to ternary '!user ? false : true'
      });
   } // end OnInit

   /* OPERATION: onSaveData
      -- reaches out to DataStorageService to store recipes in the database */
   public onSaveData(): void {
      this.dataStorageService.storeRecipes();
   } // end onSaveData

   /* OPERATION: onFetchData
      -- reaches out to DataStorageService to fetch recipes in the database */
   public onFetchData(): void {
      this.dataStorageService.fetchRecipes().subscribe();
   } // end onFetchData

   /* OPERATION: onLogout
      -- calls logout from the AuthService*/
   public onLogout(): void {
      this.authService.logout();
   } // end onLogout

   ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
   } // end OnDestroy

} // end HeaderComponent
