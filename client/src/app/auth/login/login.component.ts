import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public errors = { username: '', password: '' };
  public processing = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private formHasError() {
    if (this.form.invalid) {
      const { username, password } = this.form.controls;
      if (username.errors) {
        this.errors.username = 'Enter your username.';
      }
      if (password.errors) {
        this.errors.password = 'Enter your password.';
      }
      return true;
    }
    return false;
  }

  submit() {
    if (!this.formHasError() && !this.processing) {
      this.processing = true;
      this.userService.login(this.form.value)
        .then(() => this.router.navigate(['/']))
        .catch(err => {
          if (err.username) {
            this.errors.username = err.username;
          } else if (err.password) {
            this.errors.password = err.password;
          } else {
            this.toastService.error(err.message, 'Please try again.');
          }
          this.processing = false;
        });
    }
  }

}
