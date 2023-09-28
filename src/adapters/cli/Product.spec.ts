import { Product } from '../../application/Product'
import { IProduct, ProductProps, StatusProduct } from '../../application/interface/IProduct'
import { IProductService } from '../../application/interface/IProductService'
import { v4 as uuidv4 } from 'uuid'
import { run } from './Product'

const mockProduct: ProductProps = {
  id: uuidv4() as string,
  name: 'any_name',
  price: 10,
  status: StatusProduct.DISABLED
}

class ProductServiceStub implements IProductService {
  private readonly product: IProduct

  constructor () {
    this.product = new Product(mockProduct)
  }

  async get (id: string): Promise<IProduct> {
    return new Promise((resolve, reject) => resolve(this.product))
  }

  async create (name: string, price: number): Promise<IProduct> {
    return new Promise((resolve, reject) => resolve(this.product))
  }

  async enable (product: IProduct): Promise<IProduct> {
    return this.product
  }

  async disable (product: IProduct): Promise<IProduct> {
    return this.product
  }
}

interface SutTypes {
  productServiceStub: IProductService
}

const makeSut = (): SutTypes => {
  const productServiceStub = new ProductServiceStub()
  return { productServiceStub }
}

describe('Product cli', () => {
  let newProductMock
  let productData: IProduct

  beforeEach(() => {
    productData = new Product({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      status: StatusProduct.DISABLED
    })
    newProductMock = jest.spyOn(Product, 'newProduct').mockReturnValue(productData)
  })

  afterEach(() => {
    newProductMock.mockRestore()
  })

  describe('action create', () => {
    it('should create new product', async () => {
      const { productServiceStub } = makeSut()
      const spyProductServiceStub = jest.spyOn(productServiceStub, 'create')
      const result = await run(productServiceStub, 'create', '', mockProduct.name, mockProduct.price)
      expect(spyProductServiceStub).toBeCalledTimes(1)
      expect(result).toBe(`Product id ${mockProduct.id} with the name any_name was created successfully`)
    })
  })

  describe('action enable', () => {
    it('should enable a product', async () => {
      const { productServiceStub } = makeSut()
      const spyProductServiceStub = jest.spyOn(productServiceStub, 'enable')
      const result = await run(productServiceStub, 'enable', '', mockProduct.name, mockProduct.price)
      expect(spyProductServiceStub).toBeCalledTimes(1)
      expect(result).toBe(`Product id ${mockProduct.id} with the name ${mockProduct.name} has been enabled`)
    })
  })

  describe('action disable', () => {
    it('should disable a product', async () => {
      const { productServiceStub } = makeSut()
      const spyProductServiceStub = jest.spyOn(productServiceStub, 'disable')
      const result = await run(productServiceStub, 'disable', '', mockProduct.name, mockProduct.price)
      expect(spyProductServiceStub).toBeCalledTimes(1)
      expect(result).toBe(`Product id ${mockProduct.id} with the name ${mockProduct.name} has been disabled`)
    })
  })

  describe('action get', () => {
    it('should get a product', async () => {
      const { productServiceStub } = makeSut()
      const spyProductServiceStub = jest.spyOn(productServiceStub, 'get')
      const result = await run(productServiceStub, 'get', '', mockProduct.name, mockProduct.price)
      expect(spyProductServiceStub).toBeCalledTimes(1)
      expect(result).toBe(`Product id ${mockProduct.id} with the name ${mockProduct.name} was found`)
    })
  })
})
