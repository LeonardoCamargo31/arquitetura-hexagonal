import { IProduct, ProductProps } from './IProduct'

export interface IProductService {
  get: (id: string) => IProduct
  create: (product: ProductProps) => IProduct
  enable: (product: IProduct) => IProduct
  disable: (product: IProduct) => IProduct
}
