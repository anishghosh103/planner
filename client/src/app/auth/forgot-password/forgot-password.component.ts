import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public error = '';
  public processing = false;
  public submitted = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private formHasError() {
    if (this.form.invalid) {
      this.error = 'Enter your username.';
      return true;
    }
    return false;
  }

  submit() {
    if (!this.formHasError() && !this.processing) {
      this.processing = true;
      this.userService.forgotPassword(this.form.value)
        .then(() => {
          this.processing = false;
          this.submitted = true;
        })
        .catch(err => {
          if (err.username) {
            this.error = err.username;
          } else {
            this.toastService.error(err.message, 'Please try again.');
          }
          this.processing = false;
        });
    }
  }

}
