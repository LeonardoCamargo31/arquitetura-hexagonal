import { IProduct } from './IProduct'

export interface IProductService {
  get: (id: string) => Promise<IProduct>
  create: (name: string, price: number) => Promise<IProduct>
  enable: (product: IProduct) => Promise<IProduct>
  disable: (product: IProduct) => Promise<IProduct>
}
