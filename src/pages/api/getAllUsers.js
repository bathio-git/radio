import mongoClient from "@/lib/mongoClient";

export default async function getAllUsers(req, res) {
    
    const client = mongoClient();
    
    try {
        await client.connect();
        const db = client.db("databaseName");
        const collection = db.collection("users");
        const users = await collection.find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'tabarouette' });
    } finally {
        await client.close();
    }
}