# Recipe App

A lightweight app that provides examples of how to 
work with Angular at a practical level. This app heavily incorporates
the use of Angular Forms, working with APIs, and validation 
techniques.

# Features

Users can create recipes by adding a name, image, and description to a 
recipe that also includes a list of added ingredients. Recipes can be saved 
to a list that can be stored on a database. 

The app is divided into three main sections:
* Recipe Component
* ShoppingList Component
* Authorization Component

# Getting Started

cd into the recipe folder and install node modules:
```
npm install
```
All required dependencies are listed in the package.json file.<br><br>
Install Angular-powered Bootstrap:
```
ng add @ng-bootstrap/ng-bootstrap
```
Set up your endpoints in: <br> 
* recipe list storage in the 'shared/data-storage.service.ts' 
file
* authorization service in the 'auth/auth.service.ts' file

# Reference

This app is a variation of the original RecipeApp created by Maximilian 
Schwarzmuller.