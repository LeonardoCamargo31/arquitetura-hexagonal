import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,
  uri: null as string,

  async connect (url: string): Promise<void> {
    this.uri = url
    this.connection = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  getConnection (): MongoClient {
    return this.connection
  },

  async getCollection (name: string): Promise<Collection> {
    return this.connection.db().collection(name)
  },

  async disconnect (): Promise<void> {
    if (this.connection?.isConnected()) {
      await this.connection.close()
      this.connection = null
    }
  }
}
