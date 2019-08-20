import { OrderOnlineComponent } from "./order-online.component";
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SaladModalComponent } from './salad-modal/salad-modal.component';
import { DrinkModalComponent } from './drink-modal/drink-modal.component';
import { DessertModalComponent } from './dessert-modal/dessert-modal.component';




describe('OrderOnlineComponent', () => {
  let fixture: ComponentFixture<OrderOnlineComponent>;
  // let mockUserService;
  // let mockModalService;
  // let mockFormBuilder;
  const formBuilder: FormBuilder = new FormBuilder();
  const formControl: FormControl = new FormControl();
  const formGroup: FormGroup = formBuilder.group({
    type: null,
    size: null,
    crust: null,
    sauce: null,
    cheese: null,
    veggies: null,
    meats: null,
    finishes: null,
    price: null,
    quantity: null
    });
  // const formArray: FormArray = new FormArray();

  beforeEach(() => {
    // mockUserService = jasmine.createSpyObj(['getUserByUsername']);
    // mockModalService = jasmine.createSpyObj([]);
    // mockUserService,
    // mockModalService,
    // mockFormBuilder = jasmine.createSpyObj(['group']);
    // component = new OrderOnlineComponent(mockFormBuilder);

      TestBed.configureTestingModule({
        declarations: [
          OrderOnlineComponent,
          PizzaModalComponent,
          SaladModalComponent,
          DrinkModalComponent,
          DessertModalComponent
        ],
          imports: [
            NgbModule.forRoot(),
            ReactiveFormsModule
            // FormArray,
            // FormControl
          ],
          providers: [
            { provide: FormBuilder, useValue: formBuilder },
            { provide: FormControl, useValue: formControl },
            { provide: FormGroup, useValue: formGroup }
          ]
      });

      fixture = TestBed.createComponent(OrderOnlineComponent);
  });

  // have to check if open lg was called

  it('should open the custom pizza modal', () => {
    spyOn(fixture.componentInstance, 'openPizza');
    fixture.componentInstance.clickedMenu = "Build Your Own Pizza";
    fixture.detectChanges();

    const pizzaModal = fixture.debugElement.queryAll(By.css('.empty-link'))[5];

    pizzaModal.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.openPizza).toHaveBeenCalled();
  });

  it('should open the speicalty pizza modal', () => {
    spyOn(fixture.componentInstance, 'openPizza');
    fixture.componentInstance.clickedMenu = "Specialty Pizzas";
    fixture.detectChanges();

    const pizzaModal = fixture.debugElement.queryAll(By.css('.empty-link'))[5];

    pizzaModal.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.openPizza).toHaveBeenCalled();
  });

  // custom, specialty?
  it('should open the salad modal', () => {
    spyOn(fixture.componentInstance, 'openSalad');
    fixture.componentInstance.clickedMenu = "Salads";
    fixture.detectChanges();

    const pizzaModal = fixture.debugElement.queryAll(By.css('.empty-link'))[5];

    pizzaModal.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.openSalad).toHaveBeenCalled();
  });

  it('should open the drink modal', () => {
    spyOn(fixture.componentInstance, 'openDrink');
    fixture.componentInstance.clickedMenu = "Drinks";
    fixture.detectChanges();

    const pizzaModal = fixture.debugElement.queryAll(By.css('.empty-link'))[5];

    pizzaModal.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.openDrink).toHaveBeenCalled();
  });

  it('should open the dessert modal', () => {
    spyOn(fixture.componentInstance, 'openDessert');
    fixture.componentInstance.clickedMenu = "Desserts";
    fixture.detectChanges();

    const pizzaModal = fixture.debugElement.queryAll(By.css('.empty-link'))[5];

    pizzaModal.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.componentInstance.openDessert).toHaveBeenCalled();
  });

  it('should present location address when midtown is selected', () => {
    fixture.detectChanges();

    fixture.componentInstance.orderOnlineForm.patchValue({location: 'Midtown'});
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span'))[0].nativeElement.textContent).toContain('Midtown');
  });

  it('should present location address when chelsea is selected', () => {
    fixture.detectChanges();

    fixture.componentInstance.orderOnlineForm.patchValue({location: 'Chelsea'});
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span'))[0].nativeElement.textContent).toContain('Chelsea');
  });

  it('should present location address when east village is selected', () => {
    fixture.detectChanges();

    fixture.componentInstance.orderOnlineForm.patchValue({location: 'East Village'});
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('span'))[0].nativeElement.textContent).toContain('East Village');
  });

  //??
  it('should present business hours when the mouse cursor enters', () => {
    const mouseEnterTest = fixture.debugElement.queryAll(By.css("a"))[0];

    mouseEnterTest.triggerEventHandler('mouseover', null);
    fixture.detectChanges();

    console.log(fixture.debugElement.queryAll(By.css(".dl-for-location-bar")));

    expect(true).toBe(true);
  });
});

// do the modals appear?
// does the location address appear when a choice is selected?
// do business hours appear when the mouse cursor is hovering?
// do the menu items appear when you click the button on vertical navbar?
// do the checkboxes appear?
// do the radio buttons appear?
// do the item get added to the shopping cart?
// do the item get deleted in the shopping cart?
// can you update the item in the shopping cart?
