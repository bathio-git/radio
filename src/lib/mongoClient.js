const { MongoClient, ServerApiVersion } = require('mongodb');

export default function mongoClient (){
    
    const uri = process.env.MONGODB_URI
    
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    return client
}