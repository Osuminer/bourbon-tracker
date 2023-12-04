const Whisky = require("./schemas/whiskySchema");
const User = require("./schemas/userSchema")


// Function to get all bourbons
const getAllWhiskies = async (page, limit = 10) => {
  try {
    return await Whisky.find().skip(page * limit).limit(limit);
  } catch (error) {
    console.error("Error fetching whiskies:", error);
    throw error;
  }
};

// Function to search the database from a query
const searchWhiskies = async (query, page, limit = 10) => {

  try {
    return await Whisky.find({
      $or: [
    { Name: { $regex: query, $options: 'i' } }, // Case-insensitive search for Name
    { Tags: { $regex: query, $options: 'i' } }  // Case-insensitive search for Tags
  ]
    }).skip(page * limit).limit(limit);
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
    { Name: { $regex: query, $options: 'i' } }, // Case-insensitive search for Name
    { Tags: { $regex: query, $options: 'i' } }  // Case-insensitive search for Tags
  ]
    })
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
}

// Function to get whisky by _id
const getWhiskyById = async (id) => {
  try {
    return await Whisky.findOne({ _id: id });
  } catch (error) {
    console.error("Error fetching whiskies:", error);
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

module.exports = {
  getAllWhiskies,
  createWhisky,
  searchWhiskies,
  getWhiskyById,
  whiskiesCount
};
