import mongoClient from "@/lib/mongoClient";
const { ObjectId } = require('mongodb');

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '40mb',
        },
    },
}

export default async function modifyBase64(req, res) {

    const client = mongoClient()
    const magic = req.body
    const { base64, id } = magic

    try {
        await client.connect();
        const db = client.db("databaseName")
        const base64Collection = db.collection("mixesBase64");

        const doc = await base64Collection.findOne({ _id: new ObjectId(id) });

        const newBase64 = doc.base64 + base64;

        //console.log(newBase64)
        console.log("modified base64 string length:", newBase64.length)
        // update the document with the new base64 string
        await base64Collection.updateOne({ _id: new ObjectId(id) }, { $set: { base64: newBase64 } });

        res.status(200).json({ message: 'New chunk added successfully' })
        
    } 
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    } 
    finally {
        await client.close()
    }
}