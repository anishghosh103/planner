import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { IDate } from '../../models/date.model';
import { ActivatedRoute } from '@angular/router';
import { IMeeting } from '../../models/meeting.model';
import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../core/components/toast/toast.service';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public dates: IDate[] = [];
  public currentDate: moment.Moment = moment();
  public meetings: IMeeting[] = [];
  public days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public showTodayFAB = false;
  public today = moment();

  public admin = this.userService.currentUser.userType === 'admin';

  private userId = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    this.createCalendar(this.currentDate);
    this.socketService.onNotification(notification => {
      const meeting = notification.meeting;
      const date = this.dates.find(D => {
        return D.mDate.isSame(moment(meeting.date), 'day');
      });
      if (date) {
        switch (notification.notificationType) {
          case 'created':
            date.meetings.push(meeting);
            break;
          case 'updated':
            date.meetings = date.meetings.map(M => {
              if (M.meetingId === meeting.meetingId) {
                M = Object.assign(M, meeting);
              }
              return M;
            });
            break;
          case 'deleted':
            date.meetings = date.meetings.filter(M => {
              return M.meetingId !== meeting.meetingId;
            });
            break;
        }
      }
    });
  }

  private createCalendar(date: moment.Moment) {
    this.dates = [];
    let currentDateInGrid = 1 - moment(date).startOf('month').get('day');
    for (let i = 0; i < 42; i++) {
      const d = moment(date).date(currentDateInGrid);
      this.dates.push({
        mDate: d,
        today: d.isSame(moment(), 'day'),
        currentMonth: d.get('month') === this.currentDate.get('month')
      });
      currentDateInGrid = currentDateInGrid + 1;
    }
    this.getMeetings();
  }

  private getMeetings() {
    const month = this.currentDate.get('month');
    this.userService.getMeetings(this.userId, null, month, null)
      .then((meetings: any) => {
        meetings = meetings.map(meeting => {
          meeting.date = moment(meeting.date);
          return meeting;
        });
        this.dates = this.dates.map(date => {
          date.meetings = meetings.filter(M => M.date.isSame(date.mDate, 'day'));
          return date;
        });
      })
      .catch(err => {
        this.toastService.error(err.message);
      });
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.createCalendar(this.currentDate);
    this.showTodayFAB = !moment().isSame(this.currentDate, 'month');
  }

  previousMonth() {
    this.currentDate.subtract(1, 'month');
    this.createCalendar(this.currentDate);
    this.showTodayFAB = !moment().isSame(this.currentDate, 'month');
  }

  goToToday() {
    this.currentDate = moment();
    this.createCalendar(this.currentDate);
    this.showTodayFAB = false;
  }

}
