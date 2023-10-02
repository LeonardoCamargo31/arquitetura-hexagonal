import express, { Express, Router } from 'express'
import { makeGetProductHandler } from '../handler/Product'
import { adapterRouter } from './AdapterRouter'

export class WebServer {
  private readonly server: Express
  private readonly port=3000

  constructor () {
    this.server = express()
  }

  setupRoutes (): void {
    const router = Router()
    const getProductHandler = makeGetProductHandler()
    router.get('/product/:id', adapterRouter(getProductHandler))
    this.server.use(router)
  }

  public async run (): Promise<void> {
    await this.server.listen(this.port, () => {
      console.log(`The server is listening on port 3000 ${this.port}`)
      this.setupRoutes()
    })
  }
}

export const makeWebServer = (): WebServer => new WebServer()
