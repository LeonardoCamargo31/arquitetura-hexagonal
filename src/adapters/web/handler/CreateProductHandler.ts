import { ProductService } from '../../../application/ProductService'
import { StatusProduct } from '../../../application/interface/IProduct'
import { IProductService } from '../../../application/interface/IProductService'
import { ProductPersistence } from '../../database/ProductPersistence'
import { ProductDTO } from '../../dto/ProductDTO'
import { IHandler } from './IHandler'
import { IHttpRequest } from './IHttpRequest'
import { IHttpResponse } from './IHttpResponse'

export class CreateProductHandler implements IHandler {
  private readonly productService: IProductService

  constructor (productService: IProductService) {
    this.productService = productService
  }

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const data = request.body

    const productDTO = new ProductDTO({
      id: data.id as string,
      name: data.name as string,
      price: data.price as number,
      status: data.status as StatusProduct
    })

    const product = await this.productService.create(
      productDTO.getName,
      productDTO.getPrice
    )

    const httpResponse = {
      status: 200,
      body: product
    }

    return httpResponse
  }
}

export const makeCreateProductHandler = (): IHandler => {
  const productPersistence = new ProductPersistence()
  const productService = new ProductService(productPersistence)
  return new CreateProductHandler(productService)
}
