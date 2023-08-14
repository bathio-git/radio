import bcrypt from 'bcrypt';
import mongoClient from "@/lib/mongoClient";

export default async function login(req, res) {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { username, password } = req.body.user
    const client = mongoClient();

    try {
        await client.connect();
        const db = client.db("databaseName");
        const collection = db.collection("users");

        const user = await collection.findOne({ 'username': username });
        console.log(user)
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const passwordMatch = await bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        console.log('/////')
        console.log(user)
        console.log('/////')


        res.status(200).json({ message: 'Login successful', username: user.username, email: user.email});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await client.close();
    }
}