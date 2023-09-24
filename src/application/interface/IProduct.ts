export enum StatusProduct {
  DISABLED='disable',
  ENABLED='enabled'
}

export interface IProduct {
  isValid: () => boolean
  enable: () => null | Error
  disable: () => null | Error
  getId: () => string
  getName: () => string
  getStatus: () => string
  getPrice: () => number
}
