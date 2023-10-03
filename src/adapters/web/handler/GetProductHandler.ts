import { ProductService } from '../../../application/ProductService'
import { IProductService } from '../../../application/interface/IProductService'
import { ProductPersistence } from '../../database/ProductPersistence'
import { IHandler } from './IHandler'
import { IHttpRequest } from './IHttpRequest'
import { IHttpResponse } from './IHttpResponse'

export class GetProductHandler implements IHandler {
  private readonly productService: IProductService

  constructor (productService: IProductService) {
    this.productService = productService
  }

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const productId = request.params.id
    const product = await this.productService.get(productId)

    const httpResponse = {
      status: 200,
      body: product
    }

    return httpResponse
  }
}

export const makeGetProductHandler = (): IHandler => {
  const productPersistence = new ProductPersistence()
  const productService = new ProductService(productPersistence)
  return new GetProductHandler(productService)
}
