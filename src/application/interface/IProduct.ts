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
  readonly getId: string
  readonly getName: string
  readonly getStatus: string
  readonly getPrice: number
  isValid: () => boolean
  enable: () => null
  disable: () => null
}
