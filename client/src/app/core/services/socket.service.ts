import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket = io.connect();

  private notificationListeners = [];
  private reminderListeners = [];

  constructor() {
    this.socket.on('notification', notification => {
      this.notificationListeners.forEach(listener => listener(notification));
    });
    this.socket.on('reminder', meeting => {
      this.reminderListeners.forEach(listener => listener(meeting));
    });
  }

  setUser(userId: string) {
    this.socket.emit('set-user', userId);
  }

  onNotification(listener) {
    this.notificationListeners.push(listener);
  }

  onReminder(listener) {
    this.reminderListeners.push(listener);
  }

  reminder(meeting) {
    this.reminderListeners.forEach(listener => listener(meeting));
  }

  snooze(meeting) {
    this.socket.emit('snooze', meeting);
  }

}
