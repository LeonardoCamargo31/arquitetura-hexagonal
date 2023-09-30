import { MongoHelper } from './adapters/database/MongoHelper'

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch(console.error)
