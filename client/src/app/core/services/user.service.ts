import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';

import { IUser } from '../../models/user.model';

@Injectable()
export class UserService {

  public currentUser: IUser = null;

  private unknownError = { message: 'Error occurred.' };
  private http = {
    get: (route) => this._http.get(`${env.apiUrl}/users${route}`),
    post: (route, data = null) => this._http.post(`${env.apiUrl}/users${route}`, data),
    put: (route, data = null) => this._http.put(`${env.apiUrl}/users${route}`, data),
    delete: (route) => this._http.delete(`${env.apiUrl}/users${route}`)
  };

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(page = 1) {
    return new Promise((resolve, reject) => {
      this.http.get(`/?page=${page}`).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  getAuthStatus() {
    return new Promise((resolve, reject) => {
      this.http.get('/auth-status').subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            this.currentUser = response.data && response.data.user;
            resolve();
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  getNotifications(page: number = 1) {
    return new Promise((resolve, reject) => {
      this.http.get(`/notifications?page=${page}`).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  activateUser(userId: string) {
    return new Promise((resolve, reject) => {
      this.http.put(`/${userId}/activate`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.errors);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  resetPassword(token: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.put(`/reset-password`, { token, password }).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/login', data).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data.user);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  signup(user: IUser) {
    return new Promise((resolve, reject) => {
      this.http.post('/signup', user).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/forgot-password', data).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.post('/logout').subscribe(
        (response: any) => {
          if (response.errors) {
            reject(this.unknownError);
          } else {
            resolve();
            this.currentUser = null;
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  getMeetings(userId, year, month, day) {
    userId = userId || this.currentUser.userId;
    let query = `?`;
    if (year) { query += `year=${year}&`; }
    if (month) { query += `month=${month}&`; }
    if (day) { query += `day=${day}`; }
    return new Promise((resolve, reject) => {
      this.http.get(`/${userId}/meetings${query}`).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve(response.data.meetings);
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  deleteNotification(notificationId: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`/notifications/${notificationId}`).subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

  deleteAllNotifications() {
    return new Promise((resolve, reject) => {
      this.http.delete('/notifications').subscribe(
        (response: any) => {
          if (response.errors) {
            reject(response.errors);
          } else {
            resolve();
          }
        },
        err => reject(this.unknownError)
      );
    });
  }

}
