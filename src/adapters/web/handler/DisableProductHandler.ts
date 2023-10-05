import { ProductService } from '../../../application/ProductService'
import { IProductService } from '../../../application/interface/IProductService'
import { ProductRepository } from '../../database/mongodb/ProductRepository'
import { IHandler } from './interface/IHandler'
import { IHttpRequest } from './interface/IHttpRequest'
import { IHttpResponse } from './interface/IHttpResponse'

export class DisableProductHandler implements IHandler {
  private readonly productService: IProductService

  constructor (productService: IProductService) {
    this.productService = productService
  }

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const productId = request.params.id
    const product = await this.productService.get(productId)

    const productEnabled = await this.productService.disable(
      product
    )

    const httpResponse = {
      status: 200,
      body: productEnabled
    }

    return httpResponse
  }
}

export const makeDisableProductHandler = (): IHandler => {
  const productRepository = new ProductRepository()
  const productService = new ProductService(productRepository)
  return new DisableProductHandler(productService)
}
