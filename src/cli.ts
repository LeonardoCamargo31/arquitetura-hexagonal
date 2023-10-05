import { program } from 'commander'
import { run } from './adapters/cli/Product'
import { ProductService } from './application/ProductService'
import { ProductRepository } from './adapters/database/mongodb/ProductRepository'
import { MongoHelper } from './adapters/database/mongodb/MongoHelper'
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
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)
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
