import { ProductProps, StatusProduct } from '../../../application/interface/IProduct'
import { MongoHelper } from './MongoHelper'
import { v4 as uuidv4 } from 'uuid'
import { ProductRepository } from './ProductRepository'
import { IProductRepository } from '../../../application/interface/IProductRepository'
import { Product } from '../../../application/Product'

interface SutTypes {
  sut: IProductRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new ProductRepository()
  }
}

describe('ProductRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const collection = await MongoHelper.getCollection('product')
    await collection.deleteMany({})
  })

  describe('get', () => {
    it('should return a product', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: uuidv4(),
        name: 'any_name',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const collection = await MongoHelper.getCollection('product')
      await collection.insertOne(data)

      const product = await sut.get(data.id)
      expect(product).toEqual(
        expect.objectContaining({
          id: data.id,
          name: data.name,
          price: data.price,
          status: data.status
        })
      )
    })

    it('should return null if product is not found', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: uuidv4(),
        name: 'any_name',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = await sut.get(data.id)
      expect(product).toBeNull()
    })
  })

  describe('save', () => {
    it('should create a new product', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: uuidv4(),
        name: 'any_name',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      const response = await sut.save(product)

      const collection = await MongoHelper.getCollection('product')
      const records = await collection.find().toArray()

      expect(records.length).toBe(1)
      expect(response).toEqual(
        expect.objectContaining({
          id: data.id,
          name: data.name,
          price: data.price,
          status: data.status
        })
      )
    })

    it('should update a product', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: uuidv4(),
        name: 'any_name',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      await sut.save(product)

      const collection = await MongoHelper.getCollection('product')
      const records = await collection.find().toArray()
      expect(records.length).toBe(1)

      const productToUpdate = new Product({ ...data, status: StatusProduct.ENABLED })
      const response = await sut.save(productToUpdate)
      const products = await collection.find().toArray()

      expect(products.length).toBe(1)
      expect(response).toEqual(
        expect.objectContaining({
          id: data.id,
          name: data.name,
          price: data.price,
          status: StatusProduct.ENABLED
        })
      )
    })
  })
})
