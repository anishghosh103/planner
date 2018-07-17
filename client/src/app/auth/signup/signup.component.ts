import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../core/services/user.service';
import { ToastService } from '../../core/components/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public errors = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    mobile: ''
  };
  public countries = [{
    name: 'India',
    code: '+91'
  }];
  public processing = false;
  public registered = false;

  private usernamePattern = '^[a-zA-Z0-9\-]+$';
  private mobilePattern = '^[0-9]{10}$';
  private callingCode = '+91';

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.usernamePattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]]
    });
  }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/all?fields=callingCodes;name')
      .subscribe((response: any) => {
        this.countries = response.map(country => {
          return {
            name: country.name,
            code: '+' + country.callingCodes[0]
          };
        });
        this.callingCode = this.countries[0].code;
      });
  }

  private formHasError() {
    if (this.form.invalid) {
      // tslint:disable-next-line:forin
      for (const key in this.form.controls) {
        const errors = this.form.controls[key].errors;
        if (errors && errors.required) {
          this.errors[key] = `Enter your ${key}.`;
        } else if (errors && errors.email) {
          this.errors[key] = 'Invalid email.';
        } else if (errors && errors.minlength) {
          const capitalize = key.slice(0, 1).toUpperCase() + key.slice(1);
          this.errors[key] = `${capitalize} should contain at least ${errors.minlength.requiredLength} characters.`;
        } else if (errors && errors.pattern) {
          if (key === 'username') {
            this.errors[key] = 'Should contain only letters, numbers and (-).';
          } else {
            this.errors[key] = 'Invalid mobile number.';
          }
        }
      }
      return true;
    }
    return false;
  }

  submit() {
    if (!this.formHasError() && !this.processing) {
      this.processing = true;
      const user = {...this.form.value};
      user.mobile = this.callingCode + '-' + user.mobile;
      this.userService.signup(user)
        .then(() => this.registered = true)
        .catch(err => {
          if (err.username) {
            this.errors.username = err.username;
          } else if (err.email) {
            this.errors.email = err.email;
          } else {
            this.toastService.error(err.message);
          }
          this.processing = false;
        });
    }
  }

  onSelectCountry(callingCode) {
    this.callingCode = callingCode;
  }

}
