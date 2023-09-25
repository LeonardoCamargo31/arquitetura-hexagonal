import { MongoHelper } from './MongoHelper'

describe('MongoHelper', () => {
  beforeEach(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterEach(async () => {
    await MongoHelper.disconnect()
  })

  it('should return a mongo client instance', async () => {
    const client = MongoHelper.getConnection()
    expect(client).toBeTruthy()
  })

  it('should return null if mongo client is disconnected', async () => {
    await MongoHelper.disconnect()
    const client = MongoHelper.getConnection()
    expect(client).toBeNull()
  })

  it('should get collection by name', async () => {
    const testData = [{ name: 'any_name' }]

    const collection = await MongoHelper.getCollection('anyCollection')
    await collection.insertMany(testData)

    const data = await collection.find({}).toArray()
    expect(data[0].name).toBe('any_name')
  })
})
