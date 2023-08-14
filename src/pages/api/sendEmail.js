import nodemailer from 'nodemailer';

export default async function sendEmail(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: 'ecrire@bathio.xyz',
    to: email,
    subject: 'Email Verification',
    text: 'Please confirm your email address',
    html: '<p>Please confirm your email address</p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send email' });
    } else {
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
}