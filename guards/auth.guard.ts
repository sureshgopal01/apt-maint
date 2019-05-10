import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
		
	constructor(private authService: AuthenticationService, private router: Router) { }	
	
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let url: string = state.url;
		console.log('url++++++' + url);
		//if (localStorage.getItem('currentUser')) {
		if (this.authService.isLoggedIn) {	
            // logged in so return true
			// this.router.navigate(url);
			//this.authService.redirectUrl = url;
            return true;
        } else {

			// not logged in so redirect to login page with the return url
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
			return false;
		}
	}
}
