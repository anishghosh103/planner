import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  public name = '';
  public username = '';
  public userType = '';
  public homeRoute = false;
  public admin = false;
  public notificationCount = 0;
  public showSidebar = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.name =  `${this.userService.currentUser.firstname} ${this.userService.currentUser.lastname}`;
    this.username = this.userService.currentUser.username;
    this.userType = this.userService.currentUser.userType;
  }

  ngOnInit() {
    this.admin = this.userService.currentUser.userType === 'admin';
    this.router.events.subscribe(val => this.onRouteChange());
    this.onRouteChange();
  }

  private onRouteChange() {
    this.homeRoute = ['/', '/admin'].includes(this.router.url);
    if (this.router.url === '/notifications') {
      this.notificationCount = 0;
    }
  }

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(err => {
        this.toastService.error('Error occurred.', 'Please try again.');
      });
  }

}
