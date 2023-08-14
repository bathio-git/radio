import mongoClient from "@/lib/mongoClient";

export default async function getAllMixes(req, res) {
    
    const client = mongoClient();

    try {
        await client.connect();
        const db = client.db("databaseName");
        const collection = db.collection("mixes");
        const allMixes = await collection.find().toArray();
        res.status(200).json(allMixes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    } finally {
        await client.close();
    }
}