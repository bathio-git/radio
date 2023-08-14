import mongoClient from "@/lib/mongoClient";

export default async function getImage(req, res) {


    const client = mongoClient()

    try {
        client.connect()
        const db = client.db("databaseName")
        const collection = db.collection("images")

        // find the image that has the same metadata
        const metadata = JSON.parse(req.query.metadata);
        const image = await collection.find({ metadata : metadata }).toArray();
        res.status(200).json(image);
    } 
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    } 
    finally {
        client.close()
    }
}