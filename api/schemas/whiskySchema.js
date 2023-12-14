const mongoose = require('mongoose');

// Define the Mongoose schema for the bourbon
const whiskySchema = new mongoose.Schema({
  Name: String,
  Tags: [String],
  Type: String,
  Distiller: String,
  Bottler: String,
  ABV: String,
  Age: String,
  Price: String,
  Rating: Number,
  'House Score': Number,
  Date: String,
  Intro: String,
  Nose: String,
  Taste: String,
  Finish: String,
  ImageURL: String,
}, {collection: 'Spirits'});

// Create a Mongoose model based on the schema
const Whisky = mongoose.model('Whisky', whiskySchema);

module.exports = Whisky;
