const mongoose = require("mongoose");

// Define the Mongoose schema for the bourbon
const userSchema = new mongoose.Schema(
  {
    username: String,
    collection: [
      {
        bourbonId: {
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

userSchema.statics.getWishlistItemCount = async function(userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const wishlistCount = user.collection.reduce((count, item) => {
      return count + (item.inWishlist ? 1 : 0);
    }, 0);

    return wishlistCount;
  } catch (error) {
    console.error("Error getting wishlist count:", error.message);
    throw error;
  }
};

userSchema.statics.getCollectionItemCount = async function(userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const collectionCount = user.collection.reduce((count, item) => {
      return count + (item.inCollection ? 1 : 0);
    }, 0);

    return collectionCount;
  } catch (error) {
    console.error("Error getting wishlist count:", error.message);
    throw error;
  }
};


// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
