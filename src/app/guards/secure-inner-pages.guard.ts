import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(public authService: AuthService,
              public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isLoggedIn().pipe(map(v => {
      if (v) {
        console.log(v);
        return true;
      }
    }));

    // this.authService.isLoggedIn().pipe(map(v => {
    //   if (v) {
    //     this.router.navigate(['']);
    //     console.log('signin')
    //   }
    // }));

    // console.log('onnner', this.isLoggedIn)
    // if (this.authService.isLoggedIn) {
    //   // this.router.navigate(['']);
    // }
  }

}
