import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() public user: IUser = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onUserClick() {
    this.router.navigate(['user', this.user.userId]);
  }

}
