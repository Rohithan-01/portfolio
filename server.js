const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your own URI)
mongoose.connect('mongodb://localhost:27017/contactMessages', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a Mongoose schema & model
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// API endpoint to receive form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
