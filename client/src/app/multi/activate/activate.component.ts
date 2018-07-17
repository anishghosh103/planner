import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  public activated = false;
  public processing = true;
  public error = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      this.processing = true;
      this.userService.activateUser(userId)
        .then(data => {
          this.activated = true;
          this.processing = false;
        })
        .catch(err => {
          this.error = err.message;
          this.processing = false;
        });
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
