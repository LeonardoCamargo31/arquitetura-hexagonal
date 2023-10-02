import { IHandler, IHttpRequest } from '../handler/Product'
import { Request, Response } from 'express'

export const adapterRouter = (handler: IHandler): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params
    }
    const httpResponse = await handler.handle(httpRequest)
    if (httpResponse.status === 200) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.status(httpResponse.status).json({
        error: httpResponse.body.message
      })
    }
  }
}
