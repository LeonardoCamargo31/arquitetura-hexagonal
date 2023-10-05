import { ProductService } from '../../../application/ProductService'
import { IProductService } from '../../../application/interface/IProductService'
import { ProductRepository } from '../../database/mongodb/ProductRepository'
import { IHandler } from './interface/IHandler'
import { IHttpRequest } from './interface/IHttpRequest'
import { IHttpResponse } from './interface/IHttpResponse'

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
  const productRepository = new ProductRepository()
  const productService = new ProductService(productRepository)
  return new GetProductHandler(productService)
}
