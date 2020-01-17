export interface IPizzaitem {
  id: number,
  type: string,
  size: string,
  crust: string,
  sauce: string,
  cheese: boolean[],
  veggie: boolean[],
  meat: boolean[],
  finish: boolean[],
  price: number,
  quantity: number
}
