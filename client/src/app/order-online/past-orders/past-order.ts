import { IPizzaitem } from './pizzaitem';

export interface IPastOrder {
  id: number;
  ordered_at: string;
  location: string;
  pizzaItems: IPizzaitem[];
}
