export interface ISaladitem {
  id: number,
  type: string,
  greens: boolean[],
  cheese: boolean[],
  freshProduce: boolean[],
  meats: boolean[],
  topItOff: boolean[],
  dressings: boolean[],
  size: string,
  price: number,
  quantity: number
}
