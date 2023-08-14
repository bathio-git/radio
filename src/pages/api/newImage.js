import mongoClient from "@/lib/mongoClient";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

export default async function newImage(req, res) {

  console.log('uploadImage')
  
  const client = mongoClient()
  const { image, metadata } = req.body

  try {
    await client.connect();
    const db = client.db("databaseName")
    const collection = db.collection("images")


    // if there is an image with the same metadata, delete it
    const query = { metadata }
    const result = await collection.deleteMany(query)
    
    await collection.insertOne({ image, metadata })
    res.status(200).json({ 
      message: 'image added successfully',
      image,
      metadata,
    })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  } 
  finally {
    await client.close()
  }
}