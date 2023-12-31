const Whisky = require("./schemas/whiskySchema");
const User = require("./schemas/userSchema");

const getTypes = async () => {
  try {
    return await Whisky.distinct("Type");
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
};

const getDistillers = async () => {
  try {
    return await Whisky.distinct("Distiller");
  } catch (error) {
    console.error("Error fetching distillers:", error);
    throw error;
  }
};

const getBottlers = async () => {
  try {
    return await Whisky.distinct("Bottler");
  } catch (error) {
    console.error("Error fetching bottlers:", error);
    throw error;
  }
};

const getTags = async () => {
  try {
    const result = await Whisky.aggregate([
      { $unwind: '$Tags' }, // Unwind the array of tags
      { $group: { _id: null, tags: { $addToSet: '$Tags' } } }, // Group by null and create an array of unique tags
      { $project: { _id: 0, tags: 1 } }, // Project the result to include only the tags
    ]);

    if (result.length > 0) {
      return result[0].tags;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.find({}, "_id username");

    const usersArray = users.map((user) => ({
      id: user._id,
      username: user.username,
    }));

    return usersArray;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to get all bourbons
const getAllWhiskies = async (page, limit = 10) => {
  try {
    return await Whisky.find()
      .skip(page * limit)
      .limit(limit);
  } catch (error) {
    console.error("Error fetching whiskies:", error);
    throw error;
  }
};

// Function to search the database from a query
const searchWhiskies = async (query, page = 0, limit = 10) => {
  try {
    // const cleanQuery = query.replace(/['"]/g, '');

    return await Whisky.find({
      $or: [
        { Name: { $regex: query, $options: "i" } },
        { Tags: { $regex: query, $options: "i" } },
      ],
    })
      .skip(page * limit)
      .limit(limit);
  } catch (error) {
    console.error("Error fetching whiskies:", error);
    throw error;
  }
};

// Function to take a search query and get the total amount of documents
const whiskiesCount = async (query = "") => {
  try {
    return await Whisky.countDocuments({
      $or: [
        { Name: { $regex: query, $options: "i" } },
        {
          $or: [
            { Tags: { $regex: query, $options: "i" } }
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
};

// Function to get whisky by _id
const getWhiskyById = async (id) => {
  try {
    return await Whisky.findOne({ _id: id });
  } catch (error) {
    console.error("Error fetching whiskies:", error);
    throw error;
  }
};

// Grab whether or not a whiskey is in a users collection/wishlist
const getWhiskyByIdWithStatus = async (whiskyId, userId) => {
  try {
    // Find the whisky by _id
    const whisky = await Whisky.findById(whiskyId);

    // Find the user by _id
    const user = await User.findById(userId);

    if (!whisky || !user) {
      return null; // Whisky or user not found
    }

    // Check if the whisky is in the user's collection
    const inCollection = user.collection.some(
      (item) => item.bourbonId.equals(whiskyId) && item.inCollection === true
    );

    // Check if the whisky is in the user's wishlist
    const inWishlist = user.collection.some(
      (item) => item.bourbonId.equals(whiskyId) && item.inWishlist === true
    );

    // Return the whisky with user status
    return {
      ...whisky.toObject(),
      inCollection,
      inWishlist,
    };
  } catch (error) {
    console.error("Error fetching whisky with user status:", error);
    throw error;
  }
};

// Function to create a new bourbon
const createWhisky = async (data) => {
  try {
    const whisky = new Whisky(data);
    return await whisky.save();
  } catch (error) {
    console.error("Error creating whisky:", error);
    throw error;
  }
};

// Function to update an existing whisky bottle
const updateWhisky = async (id, data) => {
  try {
    // Find the whisky by its ID
    const whisky = await Whisky.findById(id);

    // If the whisky is not found, throw an error or handle it as needed
    if (!whisky) {
      throw new Error("Whisky not found");
    }

    // Update the whisky properties with the new data
    Object.assign(whisky, data);

    // Save the updated whisky
    return await whisky.save();
  } catch (error) {
    console.error("Error updating whisky:", error);
    throw error;
  }
};

// Function to grab a user's wishlist of bourbons
const getUserWishlistById = async (userId, page = 0, limit = 10) => {
  try {
    // Find the user and then populate the bourbonId's with the bourbon data
    const user = await User.findOne({ _id: userId }).populate({
      path: "collection.bourbonId",
      model: "Whisky",
    });

    // Go into the collection object, filter by items that are inWishlist, map them only showing the bourbonId's(bourbon data)
    if (user) {
      const wishlistBourbonIds = user.collection
        .filter((item) => item.inWishlist)
        .map((item) => item.bourbonId)
        .slice(page * limit, (page + 1) * limit);

      return wishlistBourbonIds;
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Function to get length of wishlist
const getWishlistCount = async (userId) => {
  try {
    return await User.getWishlistItemCount(userId);
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
};

// Function to grab a user's collection of bourbons
const getUserCollectionById = async (userId, page = 0, limit = 10) => {
  try {
    // Find the user and then populate the bourbonId's with the bourbon data
    const user = await User.findOne({ _id: userId }).populate({
      path: "collection.bourbonId",
      model: "Whisky",
    });

    // Go into the collection object, filter by items that are inCollection, map them only showing the bourbonId's(bourbon data)
    if (user) {
      const collectionBourbonIds = user.collection
        .filter((item) => item.inCollection)
        .map((item) => item.bourbonId)
        .slice(page * limit, (page + 1) * limit);

      return collectionBourbonIds;
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};

// Function to get length of collection
const getCollectionCount = async (userId) => {
  try {
    return await User.getCollectionItemCount(userId);
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
};

const addToCollection = async (bourbonId, userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }

    // Check if the bourbonId is already in the collection
    const existingBottle = user.collection.find((item) =>
      item.bourbonId.equals(bourbonId)
    );

    if (existingBottle) {
      // Toggle the inCollection value
      existingBottle.inCollection = !existingBottle.inCollection;
    } else {
      // Add the bourbonId to the user's collection
      user.collection.push({
        bourbonId: bourbonId,
        inCollection: true,
        inWishlist: false,
      });
    }

    // Save the updated user document
    await user.save();
  } catch (error) {
    console.error("Error adding bottle to collection: ", error);
    throw error;
  }
};

const addToWishlist = async (bourbonId, userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }

    // Check if the bourbonId is already in the collection
    const existingBottle = user.collection.find((item) =>
      item.bourbonId.equals(bourbonId)
    );

    if (existingBottle) {
      // Toggle the inWishlist value
      existingBottle.inWishlist = !existingBottle.inWishlist;
    } else {
      // Add the bourbonId to the user's wishlist
      user.collection.push({ bourbonId: bourbonId, inWishlist: true });
    }
    // Save the updated user document
    await user.save();
  } catch (error) {
    console.error("Error adding bottle to wishlist: ", error);
    throw error;
  }
};

module.exports = {
  getTypes,
  getDistillers,
  getBottlers,
  getTags,
  getUsers,
  getAllWhiskies,
  createWhisky,
  updateWhisky,
  searchWhiskies,
  getWhiskyById,
  whiskiesCount,
  getWhiskyByIdWithStatus,
  getUserWishlistById,
  getWishlistCount,
  getUserCollectionById,
  getCollectionCount,
  addToCollection,
  addToWishlist,
};
