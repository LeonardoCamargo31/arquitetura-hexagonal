import { Product } from './Product'
import { IProduct } from './interface/IProduct'
import { IProductRepository } from './interface/IProductRepository'
import { IProductService } from './interface/IProductService'

export class ProductService implements IProductService {
  private readonly productRepository: IProductRepository

  constructor (productPersistence: IProductRepository) {
    this.productRepository = productPersistence
  }

  async get (id: string): Promise<IProduct> {
    return this.productRepository.get(id)
  }

  async create (name: string, price: number): Promise<IProduct> {
    const product = Product.newProduct({ name, price })

    if (!product.isValid()) {
      return null
    }

    return this.productRepository.save(product)
  }

  async enable (product: IProduct): Promise<IProduct> {
    product.enable()
    return this.productRepository.save(product)
  }

  async disable (product: IProduct): Promise<IProduct> {
    product.disable()
    return this.productRepository.save(product)
  }
}
