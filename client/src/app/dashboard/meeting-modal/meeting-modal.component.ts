import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, keyframes, style, animate } from '@angular/animations';
import * as moment from 'moment';

import { MeetingService, MeetingModalActions } from '../../core/services/meeting.service';
import { IMeeting } from '../../models/meeting.model';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.scss'],
  animations: [
    trigger('modalAnim', [
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
export class MeetingModalComponent implements OnInit {

  public showModal = false;
  public state = 'hidden';
  public processing = false;
  public form: FormGroup;

  public mDate: moment.Moment;
  public mStartTime: moment.Moment;
  public mEndTime: moment.Moment;

  public meeting: IMeeting = null;
  public create = false;
  public edit = false;
  public display = false;

  private momentCounter = {
    hour: [],
    minute: [],
    day: [],
    month: [],
    year: []
  };
  private userId = null;

  constructor(
    private meetingService: MeetingService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      purpose: ['', Validators.required],
      date: this.fb.group({
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
      }),
      startTime: this.fb.group({
        hour: ['', Validators.required],
        minute: ['', Validators.required],
      }),
      endTime: this.fb.group({
        hour: ['', Validators.required],
        minute: ['', Validators.required],
      }),
      place: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createMomentCounter();
    this.meetingService.subscribeToModalActions(
      (action: MeetingModalActions, data: any) => {
        const { meeting, userId, year, month, day } = data;

        this.create = action === MeetingModalActions.CREATE;
        this.edit = action === MeetingModalActions.EDIT;
        this.display = action === MeetingModalActions.DISPLAY;

        this.meeting = meeting;
        if (meeting) {
          this.userId = meeting.userId;
          this.mDate = moment(meeting.date);
          this.mStartTime = moment(meeting.startTime);
          this.mEndTime = moment(meeting.endTime);
          this.form.patchValue(meeting);
        } else {
          this.userId = userId;
          this.form.reset();
          this.form.patchValue({
            date: {
              year: year || moment().get('year'),
              month: month || moment().get('month'),
              day: day || moment().get('date'),
            },
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 }
          });
        }

        this.showModal = true;
        this.state = 'shown';
      }
    );
  }

  private createMomentCounter() {
    for (let i = 1; i < 24; i++) {
      this.momentCounter.hour.push(moment({ hour: i }));
    }
    for (let i = 0; i < 60; i++) {
      this.momentCounter.minute.push(moment({ minute: i }));
    }
    for (let i = 1; i <= 31; i++) {
      this.momentCounter.day.push(moment({ day: i }));
    }
    for (let i = 0; i < 12; i++) {
      this.momentCounter.month.push(moment({ month: i }));
    }
    const currentYear = moment().get('year');
    for (let i = currentYear; i < currentYear + 100; i++) {
      this.momentCounter.year.push(moment({ year: i }));
    }
  }

  private isFormValid() {
    if (this.form.invalid) {
      this.toastService.error('Error', 'Please fill all the fields first.');
      return false;
    }
    const startTime = moment(this.form.value.startTime);
    const endTime = moment(this.form.value.endTime);
    if (startTime.isAfter(endTime)) {
      this.toastService.error('Error', 'Ending time cannot be before starting time.');
      return false;
    }
    return true;
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  hideModal() {
    this.state = 'hidden';
  }

  animationDone(event) {
    if (event.toState === 'hidden') {
      this.showModal = false;
    }
  }

  counter(N: number) {
    const array = [];
    for (let i = 0; i < N; i++) {
      array.push(i);
    }
    return array;
  }

  createMeeting() {
    if (this.isFormValid() && this.processing === false) {
      this.processing = true;
      this.meetingService.create({ userId: this.userId, ...this.form.value })
        .then(() => {
          this.hideModal();
          this.toastService.info('Meeting Created.');
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
          this.toastService.error(err.message, 'Please try again.');
        });
    }
  }

  updateMeeting() {
    if (this.isFormValid() && this.processing === false) {
      this.processing = true;
      this.meetingService.update(this.meeting.meetingId, this.form.value)
        .then(() => {
          this.hideModal();
          this.toastService.info('Meeting Updated.');
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
          this.toastService.error(err.message);
        });
    }
  }

  deleteMeeting() {
    if (this.processing === false) {
      this.processing = true;
      this.meetingService.delete(this.meeting.meetingId)
        .then(() => {
          this.hideModal();
          this.toastService.info('Meeting Deleted.');
          this.processing = false;
        })
        .catch(err => {
          this.processing = false;
          this.toastService.error(err.message);
        });
    }
  }

}
