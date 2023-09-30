import { program } from 'commander'
import { run } from './adapters/cli/Product'
import { ProductService } from './application/ProductService'
import { ProductPersistence } from './adapters/database/ProductPersistence'
import { MongoHelper } from './adapters/database/MongoHelper'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

program
  .option('-a, --action <action>', 'Enable/ Disabled a product')
  .option('-i, --id <id>', 'Product Id')
  .option('-n, --name <name>', 'Product name')
  .option('-p, --price <price>', 'Product price')

program.parse(process.argv)

const options = program.opts()
console.log('options', options)

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('db connected')
    const productPersistence = new ProductPersistence()
    const productService = new ProductService(productPersistence)
    const result = await run(
      productService,
      options.action,
      options.id,
      options.name,
      parseFloat(options.price)
    )
    console.log(result)
  })
  .catch(console.error)
