import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';

function expiredMonthYear(c: AbstractControl): { [key: string]: boolean } | null {
  let today = new Date();
  let someday = new Date();
  someday.setFullYear(c.get('expYear').value, c.get('expMonth').value - 1, someday.getDate());

  if (someday < today) {
    return { 'expired': true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-contact-info-and-payment',
  templateUrl: './contact-info-and-payment.component.html',
  styleUrls: ['./contact-info-and-payment.component.css']
})
export class ContactInfoAndPaymentComponent implements OnInit {
  contactInfoAndPaymentForm: FormGroup;
  contactInfoAndPaymentData: Object;

  constructor(private storageService: StorageService, private router: Router, private fb: FormBuilder, private http: HttpClient, private backendService: BackendService) { }

  namePattern = /^[a-zA-Z]{2,}/;
  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  phonePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
  cardNumberPattern = /^\d{4}\d{4}\d{4}\d{4}$/;
  monthPattern = /^0[1-9]$|^1[0-2]$/;
  cvcPattern = /^[0-9]{3,4}$/;
  yearPattern = /^[0-9][0-9][0-9][0-9]$/;

  ngOnInit() {
    this.getContactInfoAndPaymentData().subscribe(
      (data) => this.contactInfoAndPaymentData = data,
      (err: any) => console.log(err),
      () => {
        console.log("received response from the server 1");
        this.contactInfoAndPaymentForm = this.fb.group({
          firstName: [this.contactInfoAndPaymentData['firstName'], [Validators.required, Validators.pattern(this.namePattern)]],
          lastName: [this.contactInfoAndPaymentData['lastName'], [Validators.required, Validators.pattern(this.namePattern)]],
          email: [this.contactInfoAndPaymentData['email'], [Validators.required, Validators.pattern(this.emailPattern)]],
          phoneNumber: [this.contactInfoAndPaymentData['phoneNumber'], [Validators.required, Validators.pattern(this.phonePattern)]],

          cardNumber: [this.contactInfoAndPaymentData['cardNumber'], [Validators.required, Validators.pattern(this.cardNumberPattern)]],
          expGroup: this.fb.group({
            expMonth: [this.contactInfoAndPaymentData['expMonth'], [Validators.required, Validators.pattern(this.monthPattern)]],
            expYear: [this.contactInfoAndPaymentData['expYear'], [Validators.required, Validators.pattern(this.yearPattern)]]
          }, { validator: expiredMonthYear }),
          cvc: [this.contactInfoAndPaymentData['cvc'], [Validators.required, Validators.pattern(this.cvcPattern)]]
        });
      }
    );
  }



  getContactInfoAndPaymentData() {
    return this.http.get(this.backendService.getBackendURL() + 'form-input/ephemeral-data');
  }


  sendData() {
    const headers = new HttpHeaders({
      'firstName': this.contactInfoAndPaymentForm.controls.firstName.value.trim(),
      'lastName': this.contactInfoAndPaymentForm.controls.lastName.value.trim(),
      'email': this.contactInfoAndPaymentForm.controls.email.value,
      'phoneNumber': this.contactInfoAndPaymentForm.controls.phoneNumber.value,

      'cardNumber': this.contactInfoAndPaymentForm.controls.cardNumber.value,
      'expMonth': this.contactInfoAndPaymentForm.controls.expGroup.get('expMonth').value,
      'expYear': this.contactInfoAndPaymentForm.controls.expGroup.get('expYear').value,
      'cvc': this.contactInfoAndPaymentForm.controls.cvc.value

    });
    console.log(headers);

    this.http.post(this.backendService.getBackendURL() + 'form-input/data', {}, { headers: headers }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/checkout']);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any) {
    console.log("beforeunload reached");
    this.http.post(this.backendService.getBackendURL() + 'form-input/clean-up', {}).subscribe(resp => {
      console.log(resp);
    });
  }

  cancelAndCleanUp() {
    this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigate(['/order-online/current-order']);
  }

}
