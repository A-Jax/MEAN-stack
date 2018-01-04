import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService){}



  canActivate(): boolean {
    if(this.usersService.loggedIn()) {
      return true
    } else {
      return false;
    }
  }
}
