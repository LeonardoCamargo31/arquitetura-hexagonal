import { IProduct, StatusProduct } from './IProduct'

export interface IProductService {
  get: (id: string) => IProduct
  create: (id: string, name: string, price: number, status: StatusProduct) => IProduct
  enable: (product: IProduct) => IProduct
  disable: (product: IProduct) => IProduct
}
