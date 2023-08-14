import mongoClient from "@/lib/mongoClient";

export default async function getMixesOfUser(req, res) {

    const client = mongoClient();

    try {
        await client.connect();
        const user = req.query.user;
        const db = client.db("databaseName");
        const collection = db.collection("mixes");
        const allMixes = await collection.find({username: user }).toArray();

        // sort by date descending
        allMixes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        res.status(200).json(allMixes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    } finally {
        await client.close();
    }

}