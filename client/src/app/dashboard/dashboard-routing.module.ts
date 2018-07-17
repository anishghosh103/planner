import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { RouteGuardService } from '../core/services/route-guard.service';
import { CalendarComponent } from './calendar/calendar.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { AdminGuardService } from '../core/services/admin-guard.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserGuardService } from '../core/services/user-guard.service';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RootComponent,
        canActivate: [RouteGuardService],
        data: { isAuthenticationRequired: true },
        children: [
          {
            path: '',
            component: CalendarComponent,
            canActivate: [UserGuardService]
          },
          {
            path: 'admin',
            component: UserListComponent,
            canActivate: [AdminGuardService]
          },
          {
            path: 'user/:userId',
            component: CalendarComponent,
            canActivate: [AdminGuardService]
          },
          {
            path: 'meetings/:year/:month/:day',
            component: MeetingsComponent,
            canActivate: [UserGuardService]
          },
          {
            path: 'user/:userId/meetings/:year/:month/:day',
            component: MeetingsComponent,
            canActivate: [AdminGuardService]
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            canActivate: [UserGuardService]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
