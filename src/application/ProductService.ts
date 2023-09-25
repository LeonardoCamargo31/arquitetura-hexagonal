import { Product } from './Product'
import { IProduct, ProductProps } from './interface/IProduct'
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

  create ({ id, name, price, status }: ProductProps): IProduct {
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

  enable (product: IProduct): IProduct {
    product.enable()
    return this.productPersistence.save(product)
  }

  disable (product: IProduct): IProduct {
    product.disable()
    return this.productPersistence.save(product)
  }
}
