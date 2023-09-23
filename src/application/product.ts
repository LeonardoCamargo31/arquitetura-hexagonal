import { z } from 'zod'

export interface IProduct {
  isValid: () => boolean
  enable: () => null | Error
  disable: () => null | Error
  getId: () => string
  getName: () => string
  getStatus: () => string
  getPrice: () => number
}

export enum StatusProduct {
  DISABLED='disable',
  ENABLED='enabled'
}

const produtoSchema = z.object({
  id: z.string().refine((value) => {
    // valid UUIDv4
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  }),
  name: z.string(),
  price: z.number(),
  status: z.nativeEnum(StatusProduct)
})

type ProductProps = {
  id?: string
  name: string
  price: number
  status: StatusProduct
}

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

  isValid (): boolean {
    try {
      produtoSchema.parse(this)
      return true
    } catch (error) {
      return false
    }
  }

  enable (): null | Error {
    if (this.price > 0) {
      this.status = StatusProduct.ENABLED
      return null
    }
    return new Error('the price must be greater than zero to enable product')
  }

  disable (): null | Error {
    if (this.price === 0) {
      this.status = StatusProduct.DISABLED
      return null
    }
    return new Error('the price must be zero in order to have the product disabled')
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
}
