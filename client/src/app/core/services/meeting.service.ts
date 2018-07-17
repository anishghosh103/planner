import { Injectable } from '@angular/core';
import { IMeeting } from '../../models/meeting.model';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { SocketService } from './socket.service';

export enum MeetingModalActions {
  CREATE, EDIT, DISPLAY
}

export enum MeetingActions {
  CREATED, UPDATED, DELETED
}

@Injectable()
export class MeetingService {

  public meetings: IMeeting[] = [];

  private modalActionListeners = [];
  private meetingListeners = [];

  private http = {
    get: (route) => this._http.get(`${env.apiUrl}/meetings${route}`),
    post: (route, data = null) => this._http.post(`${env.apiUrl}/meetings${route}`, data),
    put: (route, data = null) => this._http.put(`${env.apiUrl}/meetings${route}`, data),
    delete: (route) => this._http.delete(`${env.apiUrl}/meetings${route}`),
  };
  private unknownError = { message: 'Error occurred.' };

  constructor(
    private _http: HttpClient,
    private socketService: SocketService
  ) {
    this.socketService.onNotification(data => {
      switch (data.notificationType) {
        case 'created':
          this.emit(MeetingActions.CREATED, data.meeting);
          break;
        case 'updated':
          this.emit(MeetingActions.UPDATED, data.meeting);
          break;
        case 'deleted':
          this.emit(MeetingActions.DELETED, data.meeting);
          break;
      }
    });
  }

  subscribeToModalActions(listener) {
    this.modalActionListeners.push(listener);
  }

  showMeetingModal(action: MeetingModalActions, data: any) {
    this.modalActionListeners.forEach(listener => listener(action, data));
  }

  subscribe(listener) {
    this.meetingListeners.push(listener);
  }

  emit(action: MeetingActions, meeting: IMeeting) {
    this.meetingListeners.forEach(listener => listener(action, meeting));
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/', data).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data.meeting);
            this.emit(MeetingActions.CREATED, response.data.meeting);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  update(meetingId: String, meeting: IMeeting) {
    return new Promise((resolve, reject) => {
      this.http.put(`/${meetingId}`, meeting).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data.meeting);
            this.emit(MeetingActions.UPDATED, response.data.meeting);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  delete(meetingId: String) {
    return new Promise((resolve, reject) => {
      this.http.delete(`/${meetingId}`).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
            this.emit(MeetingActions.DELETED, response.data.meeting);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

}
