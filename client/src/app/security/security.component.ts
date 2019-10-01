import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  securityCredentials: FormGroup;
  credentials = {username: '', password: ''};

  constructor(private app: SecurityService, private http: HttpClient, private router: Router, private fb: FormBuilder) {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }

  ngOnInit() {
    this.securityCredentials = this.fb.group({
      username: '',
      password: ''
    });
  }

}
