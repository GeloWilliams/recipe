import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
   { path: '', redirectTo: '/recipes', pathMatch: 'full' },
   { path: 'recipes', component: RecipesComponent, children: [
       // 'new' must come before dynamic':id' to avoid parsing 'new' as an id
      { path: 'new', component: RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent },
      { path: '', component: RecipesStartComponent }
   ]},
   { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(appRoutes)], // import created routes into module
   exports: [RouterModule]                     // export module under this config
})


export class AppRoutingModule {}