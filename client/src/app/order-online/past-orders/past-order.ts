import { IPizzaitem } from './pizzaitem';
import { ISaladitem } from './saladitem';
import { IDrinkitem } from './drinkitem';
import { IDessertitem } from './dessertitem';

export interface IPastOrder {
  id: number;
  ordered_at: string;
  location: string;
  pizzaItems: IPizzaitem[];
  saladItems: ISaladitem[];
  drinkItems: IDrinkitem[];
  dessertItems: IDessertitem[];
}
