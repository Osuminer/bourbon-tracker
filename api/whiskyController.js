const Whisky = require('./whiskySchema'); // Adjust the path as needed

// Function to get all bourbons
const getAllWhiskies = async (limit = 10) => {
  try {
    return await Whisky.find().limit(limit);
  } catch (error) {
    console.error('Error fetching whiskies:', error);
    throw error;
  }
};

// Function to create a new bourbon
const createWhisky = async (data) => {
  try {
    const whisky = new Whisky(data);
    return await whisky.save();
  } catch (error) {
    console.error('Error creating whisky:', error);
    throw error;
  }
};

module.exports = {
  getAllWhiskies,
  createWhisky,
};
