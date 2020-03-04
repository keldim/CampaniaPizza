import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUserInfo: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }

  addNewUser() {
    const headers = new HttpHeaders({
      'username': this.newUserInfo.controls.username.value,
      'password': this.newUserInfo.controls.password.value,
      'email': this.newUserInfo.controls.email.value,
      'enabled': this.newUserInfo.controls.enabled.value
    });
    console.log(headers);

    this.http.get('http://localhost:8080/openid-connect-server-webapp/add-user', { headers: headers }).subscribe(resp => {
      console.log(resp);
    });

    this.router.navigate(['/order-online/current-order']);
  }

  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  ngOnInit() {
    this.newUserInfo = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      enabled: "1"
    });
  }

}
