import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

   /* Inject dataStorargeService and authService upon instantiation */
   constructor(
      private dataStorageService: DataStorageService,
      private authService: AuthService) {}

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
   } // end ngOnInit

   onSaveData(): void {
      this.dataStorageService.storeRecipes();
   }

   onFetchData(): void {
      this.dataStorageService.fetchRecipes().subscribe();
   }

   ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
   }

}
