import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { SocketService } from './socket.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticationRequired = route.data.isAuthenticationRequired;
    return new Promise((resolve, reject) => {
      this.userService.getAuthStatus()
        .then(() => {
          this.socketService.setUser(this.userService.currentUser.userId);
          if (isAuthenticationRequired) {
            resolve(true);
          } else {
            this.router.navigate(['']);
            resolve(false);
          }
        })
        .catch(err => {
          if (isAuthenticationRequired) {
            this.router.navigate(['login']);
            resolve(false);
          } else {
            resolve(true);
          }
        });
    });
  }

}
