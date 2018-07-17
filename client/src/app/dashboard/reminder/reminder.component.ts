import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import * as moment from 'moment';
import { SocketService } from '../../core/services/socket.service';
import { IMeeting } from '../../models/meeting.model';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  animations: [
    trigger('reminderAnim', [
      transition(':enter, hidden => shown', [
        animate(200, keyframes([
          style({ transform: 'scale(0.5)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.35 }),
          style({ transform: 'scale(0.95)', offset: 0.65 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ]))
      ]),
      transition('shown => hidden', [
        style({ transform: 'scale(1)' }),
        animate(150, style({ transform: 'scale(0.25)', opacity: 0 }))
      ]),
    ])
  ]
})
export class ReminderComponent implements OnInit {

  public meeting: IMeeting = null;
  public state = 'hidden';

  public mDate: moment.Moment = null;
  public mStartTime: moment.Moment = null;
  public mEndTime: moment.Moment = null;

  private queue: IMeeting[] = [];

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.onReminder(meeting => {
      if (this.state === 'shown') {
        this.queue.push(meeting);
        return;
      }
      this.showMeeting(meeting);
    });
  }

  private showMeeting(meeting: IMeeting) {
    this.meeting = meeting;
    this.mDate = moment(meeting.date);
    this.mStartTime = moment(meeting.startTime);
    this.mEndTime = moment(meeting.endTime);
    this.state = 'shown';
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  hide() {
    this.state = 'hidden';
  }

  animationDone(event) {
    if (event.toState === 'hidden') {
      const meeting = this.queue[0];
      this.queue = this.queue.slice(1);
      if (meeting) {
        this.showMeeting(meeting);
      } else {
        this.meeting = null;
      }
    }
  }

  snooze() {
    this.socketService.snooze(this.meeting);
    this.hide();
  }

}
