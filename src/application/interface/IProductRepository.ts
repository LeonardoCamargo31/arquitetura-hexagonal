import { IProduct } from './IProduct'

export interface IProductRepository {
  get: (id: string) => Promise<IProduct>
  save: (product: IProduct) => Promise<IProduct>
}
