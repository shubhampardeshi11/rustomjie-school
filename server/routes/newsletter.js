const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const EMAIL_USER = process.env.NEWSLETTER_EMAIL_USER;
const EMAIL_PASS = process.env.NEWSLETTER_EMAIL_PASS;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  try {
    await transporter.sendMail({
      from: `"Rustomjie School" <${EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for subscribing to Rustomjie School updates!',
      text: `We appreciate your interest. You'll receive monthly updates and important news.`,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send confirmation email.' });
  }
});

export default router; 