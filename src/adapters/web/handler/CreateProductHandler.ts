import { ProductService } from '../../../application/ProductService'
import { StatusProduct } from '../../../application/interface/IProduct'
import { IProductService } from '../../../application/interface/IProductService'
import { ProductRepository } from '../../database/mongodb/ProductRepository'
import { ProductDTO } from '../../dto/ProductDTO'
import { IHandler } from './interface/IHandler'
import { IHttpRequest } from './interface/IHttpRequest'
import { IHttpResponse } from './interface/IHttpResponse'

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
  const productRepository = new ProductRepository()
  const productService = new ProductService(productRepository)
  return new CreateProductHandler(productService)
}
