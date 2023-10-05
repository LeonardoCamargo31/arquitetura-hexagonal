import { Product } from '../../application/Product'
import { IProduct } from '../../application/interface/IProduct'
import { IProductRepository } from '../../application/interface/IProductRepository'
import { MongoHelper } from './MongoHelper'

export class ProductRepository implements IProductRepository {
  async get (id: string): Promise<IProduct> {
    const productCollection = await MongoHelper.getCollection('product')
    const record = await productCollection.findOne({ id })

    if (!record) return null

    return new Product({
      id: record.id,
      name: record.name,
      price: record.price,
      status: record.status
    })
  }

  private async update (product: IProduct): Promise<IProduct> {
    const productCollection = await MongoHelper.getCollection('product')
    await productCollection.updateOne(
      { id: product.getId() },
      { $set: { ...product } }
    )

    return await this.get(product.getId())
  }

  private async create (product: IProduct): Promise<IProduct> {
    const productCollection = await MongoHelper.getCollection('product')
    const record = await productCollection.insertOne(product)
    const data = record.ops[0]

    return new Product({
      id: data.id,
      name: data.name,
      price: data.price,
      status: data.status
    })
  }

  async save (product: IProduct): Promise<IProduct> {
    const productExists = await this.get(product.getId())
    if (productExists) {
      return await this.update(product)
    }
    return await this.create(product)
  }
}
