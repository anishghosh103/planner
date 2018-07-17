import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { RouteGuardService } from '../core/services/route-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RootComponent,
        canActivate: [RouteGuardService],
        data: { isAuthenticationRequired: false },
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'signup',
            component: SignupComponent
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
