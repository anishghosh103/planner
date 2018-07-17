import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm: FormGroup;
  private token = null;

  public submitted = false;
  public processing = false;
  public error = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetPassword() {
    const errors = this.resetForm.controls.password.errors;
    if (errors || this.processing) {
      if (errors.required) {
        this.error = 'Enter a password.';
      } else if (errors.minlength) {
        this.error = 'Password should contain at least 8 characters.';
      }
      return;
    }
    const password = this.resetForm.value.password;
    this.processing = true;
    this.userService.resetPassword(this.token, password)
      .then(data => this.submitted = true)
      .catch(err => {
        this.toastService.error(err.message);
        this.processing = false;
      });
  }

}
