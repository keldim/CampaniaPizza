import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoAndPaymentComponent } from './contact-info-and-payment.component';

describe('ContactInfoAndPaymentComponent', () => {
  let component: ContactInfoAndPaymentComponent;
  let fixture: ComponentFixture<ContactInfoAndPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoAndPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
