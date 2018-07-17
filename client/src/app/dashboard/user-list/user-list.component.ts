import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../models/user.model';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: IUser[] = [];
  public more = false;

  private page = 1;

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getUsers(this.page++);
  }

  private getUsers(page: number) {
    this.userService.getAllUsers(page)
      .then((data: any) => {
        this.users = [...this.users, ...data.users];
        this.more = data.count > this.users.length;
      })
      .catch(err => this.toastService.error(err.message || 'Error occurred.'));
  }

  loadMore() {
    if (this.more) {
      this.getUsers(this.page++);
    }
  }

}
