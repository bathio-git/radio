import mongoClient from "@/lib/mongoClient";
import { ObjectId } from 'mongodb';


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '40mb',
    },
  },
}

export default async function deleteMix(req, res) {
  
  const { mixId } = req.body;
  
  if (!mixId) {
    return res.status(400).json({ error: 'Missing mixId in request body' });
  }

  console.log('deleteMix')
  
  const client = mongoClient()

  try {
    await client.connect();
    const db = client.db("databaseName")
    const collection = db.collection("mixes")
    console.log('delete', mixId)
    // use new ObjectId(mixId) instead of ObjectId(mixId)
    const result = await collection.deleteOne({ _id: new ObjectId(mixId) })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No mix found with this id' });
    }

    res.status(200).json({ message: 'Mix deleted successfully' })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  } 
  finally {
    await client.close()
  }
}
