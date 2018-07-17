import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { MultiComponent } from './multi/multi.component';
import { NotFoundComponent } from './multi/not-found/not-found.component';
import { ActivateComponent } from './multi/activate/activate.component';
import { ResetPasswordComponent } from './multi/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    MultiComponent,
    NotFoundComponent,
    ActivateComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    DashboardModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
