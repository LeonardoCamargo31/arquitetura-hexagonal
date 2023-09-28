import { MongoHelper } from './adapters/database/MongoHelper'
import { ProductPersistence } from './adapters/database/ProductPersistence'
import { ProductService } from './application/ProductService'
import { v4 as uuidv4 } from 'uuid'
import { StatusProduct } from './application/interface/IProduct'

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch(console.error)

const productPersistence = new ProductPersistence()
const productService = new ProductService(productPersistence)
const product = await productService.create({
  id: uuidv4(),
  name: 'any_name',
  price: 10,
  status: StatusProduct.DISABLED
})
