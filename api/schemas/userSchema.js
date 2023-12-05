const mongoose = require("mongoose");

// Define the Mongoose schema for the bourbon
const userSchema = new mongoose.Schema(
  {
    username: String,
    collection: [
      {
        bourbonID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Whisky",
          required: true,
        },
        inCollection: { type: Boolean, default: false },
        inWishlist: { type: Boolean, default: false },
      },
    ],
  },
  { collection: "Users" }
);

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
