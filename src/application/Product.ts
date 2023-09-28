import { z } from 'zod'
import { IProduct, ProductProps, StatusProduct } from './interface/IProduct'
import { v4 as uuidv4 } from 'uuid'

const produtoSchema = z.object({
  id: z.string().refine((value) => {
    // valid UUIDv4
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  }),
  name: z.string(),
  price: z.number(),
  status: z.nativeEnum(StatusProduct)
})

export class Product implements IProduct {
  private readonly id
  private readonly name
  private readonly price
  private status: StatusProduct

  constructor ({ id, name, price, status }: ProductProps) {
    this.id = id
    this.name = name
    this.price = price
    this.status = status
  }

  static newProduct ({ name, price }: ProductProps): IProduct {
    return new Product({
      id: uuidv4(),
      name,
      price,
      status: StatusProduct.DISABLED
    })
  }

  getId (): string {
    return this.id
  }

  getName (): string {
    return this.name
  }

  getStatus (): string {
    return this.status
  }

  getPrice (): number {
    return this.price
  }

  isValid (): boolean {
    try {
      produtoSchema.parse(this)
      return true
    } catch (error) {
      return false
    }
  }

  enable (): null {
    if (this.price > 0) {
      this.status = StatusProduct.ENABLED
      return null
    }
    throw new Error('the price must be greater than zero to enable product')
  }

  disable (): null {
    if (this.price === 0) {
      this.status = StatusProduct.DISABLED
      return null
    }
    throw new Error('the price must be zero in order to have the product disabled')
  }
}
