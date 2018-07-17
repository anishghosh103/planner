import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { MeetingService, MeetingModalActions, MeetingActions } from '../../core/services/meeting.service';
import { UserService } from '../../core/services/user.service';
import { IMeeting } from '../../models/meeting.model';
import { SlotArray } from './slot';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  public date: moment.Moment = null;
  public currentTime = { top: -2 };
  public admin = false;
  public slotArray: SlotArray;
  public loading = true;

  private userId: string;
  private timer = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.admin = this.userService.currentUser.userType === 'admin';
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.route.paramMap.subscribe(params => {
      this.date = moment({
        year: Number(params.get('year')),
        month: Number(params.get('month')),
        day: Number(params.get('day')),
      });
      this.generateUI();
    });
    this.meetingService.subscribe((action: MeetingActions, meeting: IMeeting) => {
      switch (action) {
        case MeetingActions.CREATED:
          this.addMeeting(meeting);
          break;
        case MeetingActions.UPDATED:
          this.generateUI();
          break;
        case MeetingActions.DELETED:
          this.generateUI();
          break;
      }
    });
  }

  private generateUI() {
    this.loading = true;
    if (this.timer) { clearInterval(this.timer); }
    this.slotArray = new SlotArray();
    this.currentTime = { top: -2 };
    if (this.date.isSame(moment(), 'day')) {
      const midnightTime = moment().clone().startOf('day');
      this.currentTime.top = moment().diff(midnightTime, 'minutes') - 60;
      this.timer = setInterval(() => {
        if (moment().get('second') === 0) {
          this.currentTime.top += 1;
        }
      }, 1000);
    }
    this.userService.getMeetings(
      this.userId,
      this.date.get('year'),
      this.date.get('month'),
      this.date.get('date')
    )
    .then((meetings: any) => {
      this.createMeetings(meetings);
      this.loading = false;
    })
    .catch(err => {
      this.toastService.error(err.message || 'Error occurred.');
      this.loading = false;
    });
  }

  private createMeetings(meetings) {
    // TODO: when creating meetings show loader for better UI
    meetings.forEach(meeting => this.addMeeting(meeting));
  }

  private addMeeting(meeting: IMeeting) {
    const startTime = moment(meeting.startTime);
    const endTime = moment(meeting.endTime);
    const minHeight = 30;
    const offset = 60;

    const ui = { top: 0, height: 0 };
    ui.top = startTime.diff(startTime.clone().startOf('day'), 'minutes') - offset;
    ui.height = endTime.diff(startTime, 'minutes');
    ui.height = ui.height < minHeight ? minHeight : ui.height;
    meeting.ui = ui;

    this.slotArray.add(meeting);
  }

  private navigate(...params) {
    if (this.admin) {
      params = ['user', this.userId, ...params];
    }
    this.router.navigate(params);
  }

  goBack() {
    if (this.admin) {
      this.router.navigate(['user', this.userId]);
    } else {
      this.router.navigate(['']);
    }
  }

  nextDay() {
    const nextDay = moment(this.date).add(1, 'day');
    this.navigate(
      'meetings',
      nextDay.get('year'),
      nextDay.get('month'),
      nextDay.get('date')
    );
  }

  previousDay() {
    const previousDay = moment(this.date).subtract(1, 'day');
    this.navigate(
      'meetings',
      previousDay.get('year'),
      previousDay.get('month'),
      previousDay.get('date')
    );
  }

  counter(N: number) {
    const array = [];
    for (let i = 1; i <= N; i++) {
      array.push(i);
    }
    return array;
  }

  onMeetingClick(meeting: IMeeting) {
    if (this.admin) {
      this.meetingService.showMeetingModal(MeetingModalActions.EDIT, { meeting });
    } else {
      this.meetingService.showMeetingModal(MeetingModalActions.DISPLAY, { meeting });
    }
  }

}
