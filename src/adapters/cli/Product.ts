/* eslint-disable no-case-declarations */
import { IProductService } from '../../application/interface/IProductService'

export const run = async (productService: IProductService, action: string, productId: string, productName: string, productPrice: number): Promise<string> => {
  let result

  switch (action) {
    case 'create': {
      const product = await productService.create(productName, productPrice)
      result = `Product id ${product.getId} with the name ${product.getName} was created successfully`
      break
    }
    case 'enable': {
      const product = await productService.get(productId)
      await productService.enable(product)
      result = `Product id ${product.getId} with the name ${product.getName} has been enabled`
      break
    }
    case 'disable': {
      const product = await productService.get(productId)
      await productService.disable(product)
      result = `Product id ${product.getId} with the name ${product.getName} has been disabled`
      break
    }
    default: {
      const product = await productService.get(productId)
      result = `Product id ${product.getId} with the name ${product.getName} was found`
      break
    }
  }

  return result
}
