import { makeWebServer } from './adapters/web/server/Server'
import { MongoHelper } from './adapters/database/mongodb/MongoHelper'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('db connected')
    const server = makeWebServer()
    void server.run()
  })
  .catch(console.error)
