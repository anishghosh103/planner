import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services/user.service';
import { RouteGuardService } from './services/route-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { MeetingService } from './services/meeting.service';
import { UserGuardService } from './services/user-guard.service';
import { SocketService } from './services/socket.service';
import { ToastService } from './components/toast/toast.service';

import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    MeetingService,
    RouteGuardService,
    AdminGuardService,
    UserGuardService,
    SocketService,
    ToastService
  ],
  declarations: [ToastComponent],
  exports: [ToastComponent]
})
export class CoreModule { }
