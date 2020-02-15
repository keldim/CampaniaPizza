export interface IPizzaitem {
  id: number,
  type: string,
  size: string,
  crust: string,
  sauce: string,
  cheese: boolean[],
  veggies: boolean[],
  meats: boolean[],
  finishes: boolean[],
  price: number,
  quantity: number
}
