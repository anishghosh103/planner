import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { UserService } from '../../core/services/user.service';
import { MeetingModalActions, MeetingService } from '../../core/services/meeting.service';

@Component({
  selector: 'app-create-meeting-btn',
  templateUrl: './create-meeting-btn.component.html',
  styleUrls: ['./create-meeting-btn.component.scss']
})
export class CreateMeetingBtnComponent implements OnInit {

  @Input() shrink = false;
  public admin: boolean;

  private params: any;

  constructor(
    private userService: UserService,
    private meetingService: MeetingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.admin = this.userService.currentUser.userType === 'admin';
  }

  ngOnInit() {
    this.getParams();
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(() => this.getParams());
  }

  private getParams() {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.params = route.snapshot.params;
  }

  createMeeting() {
    this.meetingService.showMeetingModal(MeetingModalActions.CREATE, this.params);
  }

}
