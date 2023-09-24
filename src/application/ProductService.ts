import { Product } from './Product'
import { IProduct, StatusProduct } from './interface/IProduct'
import { IProductPersistence } from './interface/IProductPersistence'
import { IProductService } from './interface/IProductService'

export class ProductService implements IProductService {
  private readonly productPersistence: IProductPersistence

  constructor (productPersistence: IProductPersistence) {
    this.productPersistence = productPersistence
  }

  get (id: string): IProduct {
    return this.productPersistence.get(id)
  }

  create (id: string, name: string, price: number, status: StatusProduct): IProduct {
    const product = new Product({
      id,
      name,
      price,
      status
    })

    if (!product.isValid()) {
      return null
    }

    return this.productPersistence.save(product)
  }

  enable (product: IProduct): IProduct | Error {
    const error = product.enable()
    if (error) {
      return error
    }

    return this.productPersistence.save(product)
  }

  disable (product: IProduct): IProduct | Error {
    const error = product.disable()
    if (error) {
      return error
    }

    return this.productPersistence.save(product)
  }
}
