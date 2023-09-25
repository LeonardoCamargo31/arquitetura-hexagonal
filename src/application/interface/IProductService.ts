import { IProduct, ProductProps } from './IProduct'

export interface IProductService {
  get: (id: string) => Promise<IProduct>
  create: (product: ProductProps) => Promise<IProduct>
  enable: (product: IProduct) => Promise<IProduct>
  disable: (product: IProduct) => Promise<IProduct>
}
