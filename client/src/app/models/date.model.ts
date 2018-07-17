import * as moment from 'moment';
import { IMeeting } from './meeting.model';

export interface IDate {
  mDate: moment.Moment;
  today: boolean;
  currentMonth: boolean;
  meetings?: IMeeting[];
}
