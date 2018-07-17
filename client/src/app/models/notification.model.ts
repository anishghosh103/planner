import { IMeeting } from './meeting.model';

export interface INotification {
  notificationId: string;
  notificationType: string;
  meeting: IMeeting;
}
