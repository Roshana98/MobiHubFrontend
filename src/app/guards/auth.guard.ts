import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth :AuthenticationService, private router: Router){}

  canActivate(): boolean{
    if(this._auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['signIn'])
    }
    return false;
  }
}
