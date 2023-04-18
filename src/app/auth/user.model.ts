/* User Model
   -- stores all core data of User
   -- uses a token getter in order to automate validation 
   -- getters behave like enhanced properties */
export class User {

   constructor(
      public email: string, 
      public id: string, 
      public _token: string, 
      public _tokenExpirationDate: Date
   ) {} // create new Users on the fly

   /* GETTER: token */
   get token(): string | null {
      // check validity
      if (!this._tokenExpirationDate || new Date > this._tokenExpirationDate)
         return null;
      return this._token;
   } // end token
}