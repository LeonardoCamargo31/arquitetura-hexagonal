import { StatusProduct } from '../../application/interface/IProduct'

export type ProductDTOProps = {
  id?: string
  name?: string
  price?: number
  status?: StatusProduct
}

export class ProductDTO {
  private readonly id: string
  private readonly name: string
  private readonly price: number
  private readonly status: StatusProduct

  get getId (): string {
    return this.id
  }

  get getName (): string {
    return this.name
  }

  get getPrice (): number {
    return this.price
  }

  get getStatus (): StatusProduct {
    return this.status
  }

  constructor ({ id, name, price, status }: ProductDTOProps) {
    this.id = id
    this.name = name
    this.price = price
    this.status = status
  }
}
