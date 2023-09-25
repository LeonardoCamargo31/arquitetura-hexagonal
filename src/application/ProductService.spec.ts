import { Product } from './Product'
import { ProductService } from './ProductService'
import { IProduct, ProductProps, StatusProduct } from './interface/IProduct'
import { IProductPersistence } from './interface/IProductPersistence'
import { IProductService } from './interface/IProductService'
import { v4 as uuidv4 } from 'uuid'

interface SutTypes {
  sut: IProductService
}

const mockProduct = {
  id: uuidv4(),
  name: 'any_name',
  price: 10,
  status: StatusProduct.DISABLED
}

class ProductPersistenceStub implements IProductPersistence {
  private readonly product: IProduct

  constructor () {
    this.product = new Product(mockProduct)
  }

  async get (id: string): Promise<IProduct> {
    return new Promise((resolve, reject) => resolve(this.product))
  }

  async save (product: IProduct): Promise<IProduct> {
    return new Promise((resolve, reject) => resolve(product))
  }
}

const makeSut = (): SutTypes => {
  const productPersistenceStub = new ProductPersistenceStub()
  return {
    sut: new ProductService(productPersistenceStub)
  }
}

describe('ProductService', () => {
  describe('get', () => {
    it('should return a product', async () => {
      const { sut } = makeSut()
      const product = await sut.get(mockProduct.id)
      expect(product.getId()).toBe(mockProduct.id)
    })
  })

  describe('create', () => {
    it('should create a new product', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        status: mockProduct.status
      }
      const product = await sut.create(data)
      expect(product.getId()).toBe(mockProduct.id)
    })

    it('should return null if invalid product', async () => {
      const { sut } = makeSut()
      const data: ProductProps = {
        id: 'invalid_id',
        name: mockProduct.name,
        price: mockProduct.price,
        status: mockProduct.status
      }
      const product = await sut.create(data)
      expect(product).toBeNull()
    })
  })

  describe('enable', () => {
    it('should enable a product', async () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 10 })
      const response = await sut.enable(product)
      expect(response.getStatus()).toBe(StatusProduct.ENABLED)
    })

    it('should return error, if price is less than zero', async () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 0 })
      const promise = sut.enable(product)
      await expect(promise).rejects.toThrow('the price must be greater than zero to enable product')
    })
  })

  describe('disable', () => {
    it('should disable a product', async () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 0 })
      const response = await sut.disable(product)
      expect(response.getStatus()).toBe(StatusProduct.DISABLED)
    })

    it('should return error, if price is greater than zero', async () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 10 })
      const promise = sut.disable(product)
      await expect(promise).rejects.toThrow('the price must be zero in order to have the product disabled')
    })
  })
})
