import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

    // tslint:disable-next-line:variable-name
    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authData = localStorage.getItem('authData');
        if (!Boolean(authData)) {
            return true;
        } else {
            this._router.navigate(['server'], {
                queryParams: JSON.parse(authData)
            });
            return false;
        }
    }
}
