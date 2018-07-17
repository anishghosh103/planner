import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiComponent } from './multi/multi.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'activate/:userId',
        component: MultiComponent,
        data: {
          page: 'activate'
        }
      },
      {
        path: 'reset/:token',
        component: MultiComponent,
        data: {
          page: 'reset'
        }
      },
      {
        path: '**',
        component: MultiComponent,
        data: {
          page: 'not-found'
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
