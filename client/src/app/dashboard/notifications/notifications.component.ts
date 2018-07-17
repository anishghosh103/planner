import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../core/components/toast/toast.service';
import { INotification } from '../../models/notification.model';
import { IMeeting } from '../../models/meeting.model';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications: INotification[] = [];
  public initialized = false;
  public processing = false;
  public hasMore = false;

  private page = 1;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNotifications();
    this.socketService.onNotification(notification => {
      this.notifications = [notification, ...this.notifications];
    });
  }

  private getNotifications() {
    this.processing = true;
    this.userService.getNotifications(this.page++)
      .then((data: any) => {
        this.notifications = [...this.notifications, ...data.notifications];
        this.hasMore = data.total > this.notifications.length;
        this.processing = false;
        this.initialized = true;
      })
      .catch(err => {
        this.toastService.error(err.message || 'Error occurred.');
        this.processing = false;
      });
  }

  private parse(notification: INotification) {
    const meeting: IMeeting = notification.meeting;
    const type = notification.notificationType;
    const adminName = type === 'created' ? meeting.createdBy.adminName : meeting.updatedBy.adminName;
    const meetingMoment = moment(meeting.updatedAt);
    const time = `${meetingMoment.format('Do MMMM, YYYY')} at ${meetingMoment.format('HH:MM')}`;
    return `${adminName} has ${type} the meeting '<b>${meeting.purpose}</b>' on ${time}`;
  }

  loadMore() {
    if (this.hasMore) {
      this.getNotifications();
    }
  }

  onNotificationClick(notification: INotification) {
    const meeting: IMeeting = notification.meeting;
    this.userService.deleteNotification(notification.notificationId)
      .then(() => {}).catch(() => {});
    this.router.navigate([
      'meetings',
      meeting.date.year,
      meeting.date.month,
      meeting.date.day
    ]);
  }

  deleteAllNotifications() {
    this.initialized = false;
    this.processing = true;
    this.userService.deleteAllNotifications()
      .then(() => {
        this.notifications = [];
        this.processing = false;
        this.initialized = true;
        this.hasMore = false;
      })
      .catch(err => this.toastService.error('Error occurred.', 'Please try again.'));
  }

}
