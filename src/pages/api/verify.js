import jwt from 'jsonwebtoken';
import mongoClient from "@/lib/mongoClient";

export default async function verify(req, res) {
    
    const client = mongoClient();

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { token } = req.body;

    if (!token) {
        res.status(400).json({ message: 'Token is required' });
        return;
    }

    try {
        await client.connect();
        const db = client.db("databaseName");

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const notConfirmedCollection = db.collection('notConfirmed');
        const userCollection = db.collection('users');

        // Find the user in the notConfirmed collection
        const user = await notConfirmedCollection.findOne({ username: decoded.username });
        if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
        }

        // Move the user to the users collection
        await userCollection.insertOne(user);
        await notConfirmedCollection.deleteOne({ username: decoded.username });

        res.status(200).json({ 
            message: 'User verified successfully' ,
            username: decoded.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong.' });
    } finally {
        client.close();
    }
}
