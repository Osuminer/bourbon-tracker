const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const whiskyController = require("./whiskyController");

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = process.env.DB_URL;

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "OPTIONS"],
  })
);

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/api/types", async (req, res) => {
  try {
    const types = await whiskyController.getTypes();

    res.json(types);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/distillers", async (req, res) => {
  try {
    const distillers = await whiskyController.getDistillers();

    res.json(distillers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/bottlers", async (req, res) => {
  try {
    const bottlers = await whiskyController.getBottlers();

    res.json(bottlers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const tags = await whiskyController.getTags();

    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await whiskyController.getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all whiskies or search whiskies
app.get("/api/whiskies", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const page = req.query.p || 0;
    const itemsPerPage = 24;

    if (searchQuery) {
      // If 'q' query parameter is present, perform a search
      const whiskies = await whiskyController.searchWhiskies(
        searchQuery,
        page,
        itemsPerPage
      );
      res.json(whiskies);
    } else {
      // If 'q' query parameter is not present, get all whiskies
      const whiskies = await whiskyController.getAllWhiskies(
        page,
        itemsPerPage
      );
      res.json(whiskies);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all whiskies or search whiskies
app.get("/api/whiskies/count", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (searchQuery) {
      // If 'q' query parameter is present, perform a search
      const whiskies = await whiskyController.whiskiesCount(searchQuery);
      res.json(whiskies);
    } else {
      // If 'q' query parameter is not present, get all whiskies
      const whiskies = await whiskyController.whiskiesCount();
      res.json(whiskies);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get whisky by user and id
app.get("/api/whiskies/:id/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;

    const whisky = await whiskyController.getWhiskyByIdWithStatus(id, userId);

    res.json(whisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get whisky by id
app.get("/api/whiskies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const whisky = await whiskyController.getWhiskyById(id);

    res.json(whisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new whisky
app.post("/api/whiskies", async (req, res) => {
  try {
    const newWhisky = await whiskyController.createWhisky(req.body);
    res.json(newWhisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an existing whisky
app.put("/api/whiskies/:id", async (req, res) => {
  try {
    const updatedWhisky = await whiskyController.updateWhisky(
      req.params.id,
      req.body
    );

    // Check if the whisky was found and updated
    if (!updatedWhisky) {
      return res.status(404).json({ error: "Whisky not found" });
    }

    res.json(updatedWhisky);
  } catch (err) {
    console.error("Error updating whisky:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all wishlist items
app.get("/api/wishlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const page = req.query.p || 0;
    const itemsPerPage = 24;

    const whisky = await whiskyController.getUserWishlistById(
      userId,
      page,
      itemsPerPage
    );

    res.json(whisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get count of wishlist items
app.get("/api/wishlist/count/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const num = await whiskyController.getWishlistCount(userId);

    res.json(num);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all wishlist items
app.get("/api/collection/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const page = req.query.p || 0;
    const itemsPerPage = 24;

    const whisky = await whiskyController.getUserCollectionById(
      userId,
      page,
      itemsPerPage
    );

    res.json(whisky);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get count of wishlist items
app.get("/api/collection/count/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const num = await whiskyController.getCollectionCount(userId);

    res.json(num);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add bottle to wishlist
app.get("/api/wishlist/toggle/:bourbonId/:userId", async (req, res) => {
  try {
    const { bourbonId, userId } = req.params;

    // Check if bourbonId and userId are provided in the request body
    if (!bourbonId || !userId) {
      return res
        .status(400)
        .json({
          error:
            "Bad Request: bourbonId and userId are required in the request",
        });
    }

    // Call the addToWishlist function with bourbonId and userId
    await whiskyController.addToWishlist(bourbonId, userId);

    res.status(200).json({ result: "Successfully added bottle to wishlist" });
  } catch (err) {
    console.error("Error in /api/wishlist route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rroute to add bottle to collection
app.get("/api/collection/toggle/:bourbonId/:userId", async (req, res) => {
  try {
    const { bourbonId, userId } = req.params;

    // Check if bourbonId and userId are provided in the request body
    if (!bourbonId || !userId) {
      return res
        .status(400)
        .json({
          error:
            "Bad Request: bourbonId and userId are required in the request",
        });
    }

    // Call the addToCollection function with bourbonId and userId
    await whiskyController.addToCollection(bourbonId, userId);

    res.status(200).json({ result: "Successfully added bottle to collection" });
  } catch (err) {
    console.error("Error in /api/collection route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/testing", async (req, res) => {
  try {
    const postData = req.body;
    console.log(req.body);
    res.status(200).json(postData);
  } catch (error) {
    console.error("Error in /api/testing route:", error);
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
