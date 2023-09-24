import { Product } from './Product'
import { ProductService } from './ProductService'
import { IProduct, StatusProduct } from './interface/IProduct'
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

  get (id: string): IProduct {
    return this.product
  }

  save (product: IProduct): IProduct {
    return product
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
    it('should return a product', () => {
      const { sut } = makeSut()
      const product = sut.get(mockProduct.id)
      expect(product.getId()).toBe(mockProduct.id)
    })
  })

  describe('create', () => {
    it('should create a new product', () => {
      const { sut } = makeSut()
      const product = sut.create(mockProduct.id, mockProduct.name, mockProduct.price, mockProduct.status)
      expect(product.getId()).toBe(mockProduct.id)
    })

    it('should return null if invalid product', () => {
      const { sut } = makeSut()
      const product = sut.create('invalid_id', mockProduct.name, mockProduct.price, mockProduct.status)
      expect(product).toBeNull()
    })
  })

  describe('enable', () => {
    it('should enable a product', () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 10 })
      const response = sut.enable(product)
      expect(response.getStatus()).toBe(StatusProduct.ENABLED)
    })

    it('should return error, if price is less than zero', () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 0 })
      expect(() => sut.enable(product)).toThrow('the price must be greater than zero to enable product')
    })
  })

  describe('disable', () => {
    it('should disable a product', () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 0 })
      const response = sut.disable(product)
      expect(response.getStatus()).toBe(StatusProduct.DISABLED)
    })

    it('should return error, if price is greater than zero', () => {
      const { sut } = makeSut()
      const product = new Product({ ...mockProduct, price: 10 })
      expect(() => sut.disable(product)).toThrow('the price must be zero in order to have the product disabled')
    })
  })
})
