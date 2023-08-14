import mongoClient from "@/lib/mongoClient";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '40mb',
    },
  },
}

export default async function newMix(req, res) {

  console.log('newMix')
  
  const client = mongoClient()
  const magic = req.body
  const { base64, text, date, user, source, duration } = magic
  const { username, email } = user
  console.log(user)
  try {
    await client.connect();
    const db = client.db("databaseName")
    const collection = db.collection("mixes")

    await collection.insertOne({ base64, text, date, username, email, source, duration })
    res.status(200).json({ message: 'New mix created successfully' })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  } 
  finally {
    await client.close()
  }
}