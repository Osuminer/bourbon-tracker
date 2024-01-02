const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// Replace 'your_database_url' with your actual MongoDB connection URL
const mongoURI =
  "mongodb+srv://cstas:c2Gm6lqThbUx11R0@cluster0.voywkmb.mongodb.net/Bourbons?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Whisky = require("./schemas/whiskySchema"); // Import your Mongoose model

function processTagsString(tagsString) {
  let result = "";

  for (let i = 0; i < tagsString.length; i++) {
    const char = tagsString[i];

    // if (char === "'" && tagsString[i + 1] !== "s") {
    if (char === "'" && !/[a-z]/.test(tagsString[i + 1])) {
      result += '"';
    } else {
      result += char;
    }
  }

  return result;
}

async function updateTags() {
  try {
    const documents = await Whisky.find(); // Fetch all documents from the collection

    for (const doc of documents) {
      if (doc.Tags && Array.isArray(doc.Tags)) {
        try {
          const modifiedTagsString = processTagsString(doc.Tags[0]);

          console.log(modifiedTagsString);

          // Parse the modified stringified array and update the document
          const parsedTags = JSON.parse(modifiedTagsString);

          // Update the document with the parsed array
          doc.Tags = parsedTags;

          await doc.save();
        } catch (error) {
          console.error("Error updating tags:", error);
        }
      }
    }

    console.log("Tags updated successfully.");
  } catch (error) {
    console.error("Error updating tags:", error);
  } finally {
    mongoose.disconnect();
  }
}

updateTags();
