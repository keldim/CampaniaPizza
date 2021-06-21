import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const passwordConfirmationControl = c.get('passwordConfirmation');
  if (passwordControl.value === passwordConfirmationControl.value) {
    return null;
  }
  return { 'match': true };
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUserInfo: FormGroup;
  alert: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  addNewUser() {
    const header1 = new HttpHeaders({
      'username': this.newUserInfo.controls.username.value
    });

    this.http.post(this.authService.getAuthorityURL() + 'username-duplicate', {}, { headers: header1 }).subscribe((response: boolean) => {
      if (response === true) {
        console.log("reached");
        this.alert = true;
        this.router.navigate(['/new-user']);
        return;
      } else {
        const header2 = new HttpHeaders({
          'username': this.newUserInfo.controls.username.value,
          'password': this.newUserInfo.controls.passwordGroup.get('password').value,
          'email': this.newUserInfo.controls.email.value,
          'enabled': this.newUserInfo.controls.enabled.value
        });

        console.log(header2);

        this.http.post(this.authService.getAuthorityURL() + 'add-user', {}, { headers: header2 }).subscribe(resp => {
          console.log(resp);
        });

        this.router.navigate(['/order-online/current-order']);
      }
    });
  }

  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordPattern = /^(?=.*\d).{4,8}$/;
  usernamePattern = /^[a-zA-Z]\w{3,14}$/;

  ngOnInit() {
    this.newUserInfo = this.fb.group({
      username: ["", [Validators.required, Validators.pattern(this.usernamePattern)]],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.pattern(this.passwordPattern)]],
        passwordConfirmation: ["", Validators.required]
      }, { validator: passwordMatcher }),
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      enabled: "1"
    });
    this.alert = false;
    console.log(this.alert);
  }

}
