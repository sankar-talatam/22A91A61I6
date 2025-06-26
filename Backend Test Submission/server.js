const express = require('express');
const cors = require('cors');
const sendMail = require('./mailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  const result = await sendMail(to, subject, text);

  if (result.success) {
    res.json({ message: 'Email sent successfully!' });
  } else {
    res.status(500).json({ error: 'Failed to send email', details: result.error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
