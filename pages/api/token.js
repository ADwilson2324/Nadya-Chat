// api/token.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { email, phone } = req.body;
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  if (!TOKEN_SECRET) return res.status(500).json({ error: 'Missing token secret' });

  if (!email && !phone) {
    return res.status(400).json({ error: 'Must provide email or phone' });
  }

  const payload = {
    sub: email || phone,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };

  const token = jwt.sign(payload, TOKEN_SECRET);

  res.status(200).json({ token });
}
