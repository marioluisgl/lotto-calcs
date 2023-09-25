import { of } from 'rxjs';
import {ActivatedRouteSnapshot, 
  CanActivateChildFn, 
  CanActivateFn, 
  Router, 
  RouterStateSnapshot
} from '@angular/router';
import {inject} from '@angular/core';
import { LocalstoreService } from '../services/localstore.service';
import { IUser } from '~/models/user.model';

export const AuthGuard: CanActivateFn = ( 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
  const handleLocalStorage = inject(LocalstoreService);
  const router = inject(Router);

  const requestAccess = () => router.navigate(['']);

  try {

    const user: IUser = JSON.parse(handleLocalStorage.getItem('currentUser'));
    const value = !!user.token;
    
    if (!value) { requestAccess() }
    return of(value);

  } catch (e) {
    requestAccess();
    return of(false);
  }
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => AuthGuard(route, state);
