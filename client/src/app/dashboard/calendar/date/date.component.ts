import { Component, OnInit, Input } from '@angular/core';
import { IDate } from '../../../models/date.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() date: IDate = null;

  private userId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  goToMeetingsPage() {
    const year = this.date.mDate.get('year');
    const month = this.date.mDate.get('month');
    const day = this.date.mDate.get('date');
    const meetingUrl = ['meetings', year, month, day];
    if (!this.userId) {
      this.router.navigate(meetingUrl);
    } else {
      this.router.navigate(['user', this.userId, ...meetingUrl]);
    }
  }

}
