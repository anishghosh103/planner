import { Component, OnInit } from '@angular/core';
import { ToastService, ToastActions } from './toast.service';
import { trigger, transition, animate, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnim', [
      transition(':enter, hidden => *', [
        style({ opacity: 0 }),
        animate(150)
      ]),
      transition('active1 <=> active2', [
        animate(300, keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.25 }),
          style({ transform: 'translateX(10px)', offset: 0.5 }),
          style({ transform: 'translateX(-10px)', offset: 0.75 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ]))
      ]),
      transition('* => hidden', [
        animate(150, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  public type = '';
  public title = '';
  public body = '';
  public state = 'hidden';
  public show = false;

  private timer = null;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.toastService.subscribe(
      (action: ToastActions, title: string, body: string) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.title = title;
        this.body = body;
        this.type = action === ToastActions.ERROR ? 'error' : 'info';
        this.show = true;
        this.state = ['hidden', 'active1'].includes(this.state) ? 'active2' : 'active1';
        this.timer = setTimeout(() => this.state = 'hidden', 5000);
      }
    );
  }

  animationDone(val) {
    if (val.toState === 'hidden') {
      this.show = false;
    }
  }

}
