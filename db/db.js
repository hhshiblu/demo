import { MongoClient } from "mongodb"



const uri = "mongodb+srv://hh_shiblu:jseshiblu55@cluster0.7np6gn8.mongodb.net/?retryWrites=true&w=majority"


const options = {}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
