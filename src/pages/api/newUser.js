import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import mongoClient from "@/lib/mongoClient";

export default async function newUser(req, res) {
    const client = mongoClient();

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    let magic = req.body;

    // Hash the password outside dbFunction
    bcrypt.hash(magic.user.password, 5, async function (err, hash) {
        if (err) {
        // Handle error
            res.status(500).json({ message: 'Something went wrong.' });
        return;
        }

        let newUserInfo = {
        username: magic.user.username,
        password: hash,
        email: magic.user.email
        };

        // Create the user
        const userCreated = await dbFunction(client, newUserInfo, res);

        if (!userCreated) {
        // dbFunction already sent a response, so just return
        console.log('User not created');
        res.status(500).json({ message: 'Something went wrong' });
        }

        // Send success response to client
        //res.status(200).json({ message: 'Registration successful! Please check your email to verify your account.' });
    });

    async function dbFunction(client, obj, res) {
        try {
            await client.connect();
            const db = client.db("databaseName");
            const users = db.collection('users');
            const notConfirmed = db.collection('notConfirmed');
            
            const existingUsernameInUsers = await users.findOne({ username: obj.username });
            const existingEmailInUsers = await users.findOne({ email: obj.email });

            const existingUsernameInNotConfirmed = await notConfirmed.findOne({ username: obj.username });
            const existingEmailInNotConfirmed = await notConfirmed.findOne({ email: obj.email });

            if (existingUsernameInUsers || existingUsernameInNotConfirmed) {
                res.status(409).json({ message: 'Username already exists' });
                client.close();
                return false;
            }

            if (existingEmailInUsers || existingEmailInNotConfirmed) {
                res.status(409).json({ message: 'Email is already used' });
                client.close();
                return false;
            }


            // create token
            const token = jwt.sign({ username: obj.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            let verificationLink = `${process.env.NEXT_PUBLIC_API_URL}verify?token=${token}`;
            let text = `Hey mate, here is your verification link: ${verificationLink}. If you like the app, please consider donating. Have fun!`;

            let mailOptions = {
                from: 'ecrire@bathio.xyz',
                to: obj.email,
                subject: 'Email Verification',
                text: text,
                html: `<p>Hey mate, here is your verification link: <a href="${verificationLink}">${verificationLink}</a>. If you like the app, please consider donating. Have fun!</p>`,
            };

            let transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
                },
            });

            // Wrap sendMail in a promise
            const emailResult = await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: 'email not sent' });
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info);
                }
                });
            });

            console.log('Email sent: ' + emailResult.response);

            // Insert user into the database
            
            
            await notConfirmed.insertOne({ ...obj, token });
            res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
            return true;
        } catch (error) {
        console.error(error);
        // Handle error response
        res.status(500).json({ message: "I wanted to insert in notconfirmed and it didn't work" });
        return false;
        } finally {
        client.close();
        }
    }
}