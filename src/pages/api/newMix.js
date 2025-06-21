import mongoClient from "@/lib/mongoClient";
const { ObjectId } = require('mongodb');


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '40mb',
    },
  },
}

export default async function newMix(req, res) {

  const client = mongoClient()
  const magic = req.body
  const { base64, text, date, user, source, duration } = magic
  const { username, email } = user

  try {
    await client.connect();
    const db = client.db("databaseName")
    const metadataCollection = db.collection("mixesMetadata");
    const base64Collection = db.collection("mixesBase64");
    const id = new ObjectId();

    await metadataCollection.insertOne({ _id: id, text, date, username, email, source, duration });
    await base64Collection.insertOne({ _id: id, base64 });

    const x ={
      message: 'New mix created successfully',
      id: id.toString(),
      text,
      date,
      username,
      source,
      duration,
    }

    //console.log(x)

    res.status(200).json({ x })
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  } 
  finally {
    await client.close()
  }
}