import { IProduct } from './IProduct'

export interface IProductReader {
  get: (id: string) => IProduct
}

export interface IProductWriter {
  save: (product: IProduct) => IProduct
}

export interface IProductPersistence extends IProductReader, IProductWriter {}
