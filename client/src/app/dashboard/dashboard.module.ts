import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DateComponent } from './calendar/date/date.component';
import { MeetingModalComponent } from './meeting-modal/meeting-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';
import { CreateMeetingBtnComponent } from './create-meeting-btn/create-meeting-btn.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReminderComponent } from './reminder/reminder.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    RootComponent,
    CalendarComponent,
    MeetingsComponent,
    DateComponent,
    MeetingModalComponent,
    UserListComponent,
    UserComponent,
    CreateMeetingBtnComponent,
    NotificationsComponent,
    ReminderComponent
  ]
})
export class DashboardModule { }
