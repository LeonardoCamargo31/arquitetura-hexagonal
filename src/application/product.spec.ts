import { Product, StatusProduct } from './product'
import { v4 as uuidv4 } from 'uuid'

describe('Product', () => {
  describe('enable', () => {
    it('should return null if price is greater than zero', () => {
      const data = {
        id: '1',
        name: 'Hello',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      expect(product.enable()).toBeNull()
    })

    it('should return error, if price is less than zero', () => {
      const data = {
        id: '1',
        name: 'Hello',
        price: 0,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      const error = product.enable()
      expect(error.message).toBe('the price must be greater than zero to enable product')
    })
  })

  describe('disable', () => {
    it('should return null if price is equal to zero', () => {
      const data = {
        id: '1',
        name: 'Hello',
        price: 0,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      expect(product.disable()).toBeNull()
    })

    it('should return error, if price is greater than zero', () => {
      const data = {
        id: '1',
        name: 'Hello',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      const error = product.disable()
      expect(error.message).toBe('the price must be zero in order to have the product disabled')
    })
  })

  describe('isValid', () => {
    it('should return true with valid product', () => {
      const data = {
        id: uuidv4(),
        name: 'Hello',
        price: 10,
        status: StatusProduct.DISABLED
      }

      const product = new Product(data)
      expect(product.isValid()).toBeTruthy()
    })

    it('should return false with invalid product', () => {
      const data = {
        id: uuidv4(),
        name: 'Hello',
        price: 10,
        status: 'Invalid' as StatusProduct
      }

      const product = new Product(data)
      expect(product.isValid()).toBeFalsy()
    })
  })
})
