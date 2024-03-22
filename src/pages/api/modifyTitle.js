import mongoClient from "@/lib/mongoClient";
const { ObjectId } = require('mongodb');

export default async function modifyTitle(req, res) {

    const client = mongoClient()
    const magic = req.body
    const { title, id } = magic

    try {
        await client.connect();
        const db = client.db("databaseName")
        const metadataCollection = db.collection("mixesMetadata");

        const result = await metadataCollection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { text: title } } 
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No document found with the provided id' });
        }

        return res.status(200).json({ message: 'Title updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating title' });
    } finally {
        client.close();
    }
}