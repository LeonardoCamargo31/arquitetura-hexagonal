import { Product } from './Product'
import { IProduct, ProductProps } from './interface/IProduct'
import { IProductPersistence } from './interface/IProductPersistence'
import { IProductService } from './interface/IProductService'

export class ProductService implements IProductService {
  private readonly productPersistence: IProductPersistence

  constructor (productPersistence: IProductPersistence) {
    this.productPersistence = productPersistence
  }

  async get (id: string): Promise<IProduct> {
    return this.productPersistence.get(id)
  }

  async create ({ id, name, price, status }: ProductProps): Promise<IProduct> {
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

  async enable (product: IProduct): Promise<IProduct> {
    product.enable()
    return this.productPersistence.save(product)
  }

  async disable (product: IProduct): Promise<IProduct> {
    product.disable()
    return this.productPersistence.save(product)
  }
}
