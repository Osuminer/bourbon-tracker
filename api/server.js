const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const whiskyController = require("./whiskyController");

require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = process.env.DB_URL;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route to get all whiskies or search whiskies
app.get("/api/whiskies", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (searchQuery) {
      // If 'q' query parameter is present, perform a search
      const whiskies = await whiskyController.searchWhiskies(searchQuery, 20);
      // console.log(whiskies)
      res.json(whiskies);
    } else {
      // If 'q' query parameter is not present, get all whiskies
      const whiskies = await whiskyController.getAllWhiskies(20);
      res.json(whiskies);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get whisky by id
app.get("/api/whiskies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Search db by id
    const whisky = await whiskyController.getWhiskyById(id);

    res.json(whisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rroute to create a new whisky
app.post("/api/whiskies", async (req, res) => {
  try {
    const newWhisky = await whiskyController.createWhisky(req.body);
    res.json(newWhisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve static assets (React build) in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
