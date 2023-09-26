import mongoClient from "@/lib/mongoClient";

export default async function getUser(req, res) {

    console.log(req.query.username)
    const username = req.query.username;
    const client = mongoClient();

    try {
        await client.connect();
        const db = client.db("databaseName");
        const collection = db.collection("users");

        const x = await collection.findOne({ username: username });

        if (!x) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        console.log(x)

        const user = {
            username: x.username,
            email: x.email,
        }
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    } finally {
        await client.close();
    }
}