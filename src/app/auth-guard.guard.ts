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

        // false no data in localstorage
        if (!Boolean(authData)) {
            return true;
        } else {
            this._router.navigate(['server'], {
                queryParams: {server: JSON.parse(authData).server}
            });
            return false;
        }
    }
}
