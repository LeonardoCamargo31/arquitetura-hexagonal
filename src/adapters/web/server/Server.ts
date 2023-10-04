import express, { Express, Router } from 'express'
import { makeGetProductHandler } from '../handler/GetProductHandler'
import { adapterRouter } from './AdapterRouter'
import { makeCreateProductHandler } from '../handler/CreateProductHandler'
import bodyParser from 'body-parser'
import { makeEnableProductHandler } from '../handler/EnableProductHandler'
import { makeDisableProductHandler } from '../handler/DisableProductHandler'

export class WebServer {
  private readonly server: Express
  private readonly port=3000

  constructor () {
    this.server = express()
  }

  setupMiddleware (): void {
    this.server.use(bodyParser.json())
  }

  setupRoutes (): void {
    const router = Router()
    const getProductHandler = makeGetProductHandler()
    const createProductHandler = makeCreateProductHandler()
    const enableProductHandler = makeEnableProductHandler()
    const disableProductHandler = makeDisableProductHandler()

    router.get('/product/:id', adapterRouter(getProductHandler))
    router.get('/product/:id/enable', adapterRouter(enableProductHandler))
    router.get('/product/:id/disable', adapterRouter(disableProductHandler))
    router.post('/product', adapterRouter(createProductHandler))

    this.server.use(router)
  }

  public async run (): Promise<void> {
    await this.server.listen(this.port, () => {
      console.log(`The server is listening on port 3000 ${this.port}`)
      this.setupMiddleware()
      this.setupRoutes()
    })
  }
}

export const makeWebServer = (): WebServer => new WebServer()
