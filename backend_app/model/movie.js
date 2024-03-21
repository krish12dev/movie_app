const mongoose = require("mongoose");

// Define movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },      
  publishYear: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

// Create model from schema
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
