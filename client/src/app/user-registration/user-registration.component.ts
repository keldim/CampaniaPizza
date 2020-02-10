import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUserInfo: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {

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
  }

  ngOnInit() {
    this.newUserInfo = this.fb.group({
      username: "",
      password: "",
      email: "",
      enabled: "1"
    });
  }

}
