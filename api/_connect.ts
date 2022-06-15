import { MongoClient } from 'mongodb'

const databaseUrl = process.env.MONGODB_URI as string
const options = {}

let client: MongoClient

declare global {
  // eslint-disable-next-line no-var
  var _connection: Promise<MongoClient>
}

if (process.env.MONGODB_URI === null) {
  throw new Error('Please add your Atlas database URL to .env or .env.local')
}

const connectToMongo = async (): Promise<MongoClient> => {
  if (global._connection === null || global._connection === undefined) {
    client = new MongoClient(databaseUrl, options)
    global._connection = client.connect()
  }

  return await global._connection
}

export default connectToMongo
