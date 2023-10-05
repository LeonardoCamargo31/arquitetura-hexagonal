import { IHttpRequest } from './IHttpRequest'
import { IHttpResponse } from './IHttpResponse'

export interface IHandler {
  handle: (request: IHttpRequest) => Promise<IHttpResponse>
}
