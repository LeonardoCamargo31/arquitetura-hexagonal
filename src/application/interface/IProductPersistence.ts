import { IProduct } from './IProduct'

export interface IProductReader {
  get: (id: string) => Promise<IProduct>
}

export interface IProductWriter {
  save: (product: IProduct) => Promise<IProduct>
}

export interface IProductPersistence extends IProductReader, IProductWriter {}
