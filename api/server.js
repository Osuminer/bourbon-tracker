const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const whiskyController = require('./whiskyController'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())


// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://cstas:c2Gm6lqThbUx11R0@cluster0.voywkmb.mongodb.net/Bourbons?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Route to get all whiskies
app.get('/api/whiskies', async (req, res) => {
  try {
    const whiskies = await whiskyController.getAllWhiskies(20);
    res.json(whiskies);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rroute to create a new whisky
app.post('/api/whiskies', async (req, res) => {
  try {
    const newWhisky = await whiskyController.createWhisky(req.body);
    res.json(newWhisky);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static assets (React build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});