export enum StatusProduct {
  DISABLED='disable',
  ENABLED='enabled'
}

export type ProductProps = {
  id?: string
  name?: string
  price?: number
  status?: StatusProduct
}

export interface IProduct {
  isValid: () => boolean
  enable: () => null
  disable: () => null
  getId: () => string
  getName: () => string
  getStatus: () => string
  getPrice: () => number
}
