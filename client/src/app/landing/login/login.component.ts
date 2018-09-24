import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
      const user = this.loginForm.value;
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(user).pipe(first()).subscribe(data => {
        if (data && data.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.authenticationService.finishAuthentication();
        }
      }, (error: any) => {
        this.loading = false;
        this.message.type = error;
        this.message.text = error.error.error.message;
      });
    }

}
