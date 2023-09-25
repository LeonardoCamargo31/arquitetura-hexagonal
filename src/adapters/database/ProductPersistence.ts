import { IProduct } from '../../application/interface/IProduct'
import { IProductPersistence } from '../../application/interface/IProductPersistence'

export class ProductPersistence implements IProductPersistence {
  get: (id: string) => IProduct
  save: (product: IProduct) => IProduct
}
