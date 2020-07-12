import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  routeURL: string;

  constructor(public authService: AuthService,
              public router: Router) {

  this.routeURL = this.router.url;

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {

      const pagesAllowed = ['sign-up', 'sign-in', 'forgot-password'];

      console.log('route', this.routeURL);
      console.log('array', pagesAllowed);

      this.authService.isLoggedIn().subscribe((user) => {
        // console.log('user', user);
        if (!user && (this.routeURL !== '/sign-in')) {
          // assign '/sign-in' in 'routeURL' to avoid get into infinite loop
          this.routeURL = '/sign-in';
          // when the user is not logged instead of returning false
          // inject router and redirect to '/sign-in' or any other view
          this.router.navigate(['/sign-in'], {
              // note: this queryParams returns the current URL
              // that we can have in 'return' parameter,
              // so when the '/sign-in' page opens,
              // this param tell us from where it comes
            // queryParams: {
            //   return: 'sign-in'
            // }
          });
          return resolve(false);
        } else {
          // re-assign current route URL to 'routeURL'
          // when the user is logged in
          this.routeURL = this.router.url;
          // just return true - if user is logged in
          return resolve(true);
        }
      });
    });
  }

}
