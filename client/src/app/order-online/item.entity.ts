import { Product } from './product.entity';
import { SaladComponent } from '../menu/salads.component';
import { DrinkComponent } from '../menu/drinks.component';
import { DessertComponent } from '../menu/desserts.component';

export class Item {

  pizza: Product;
  quantity: number;
  salad: SaladComponent;
  drink: DrinkComponent;
  dessert: DessertComponent;

}
