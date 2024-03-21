const movieSchema = require("../model/movie");


exports.addMovie = async (req, res) => {
  try {
    // Extract data from request body
    const { title, publishYear, poster } = req.body;

    // Create a new movie document
    const newMovie = new movieSchema({
      title: title,
      publishYear: publishYear,
      poster: poster
    });

    // Save the new movie document to the database
    await newMovie.save();

    // Return success response
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie,success:true });
  } catch (error) {
    // Return error response
    console.error('Error adding movie:', error);
    res.status(500).json({ message: `Internal server error ${error?.message}`,success:false });
  }
};
// Edit Movie
exports.editMovie = async (req, res) => {
  try {
    const { id } = req.params; // Extract movie ID from request parameters
    const { title, publishYear, poster } = req.body;
 console.log(req.body)
    // Find the movie by ID
    let movie = await movieSchema.findById(id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found', success: false });
    }

    // Update movie details
    movie.title = title || movie.title;
    movie.publishYear = publishYear || movie.publishYear;
    movie.poster = poster || movie.poster;

    // Save the updated movie document
    await movie.save();

    // Return success response with the updated movie
    res.status(200).json({ message: 'Movie updated successfully', movie, success: true });
  } catch (error) {
    // Return error response
    console.error('Error editing movie:', error);
    res.status(500).json({ message: `Internal server error ${error?.message}`, success: false });
  }
};

// Delete Movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params; // Extract movie ID from request parameters

    // Find the movie by ID and delete it
    const deletedMovie = await movieSchema.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found', success: false });
    }

    // Return success response with the deleted movie
    res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie, success: true });
  } catch (error) {
    // Return error response
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: `Internal server error ${error?.message}`, success: false });
  }
};

// Get Movie
exports.getMovie = async (req, res) => {
  try {

    // Find the movie by ID
    const movie = await movieSchema.find();

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found', success: false });
    }

    // Return success response with the movie
    res.status(200).json({ movie, success: true });
  } catch (error) {
    // Return error response
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: `Internal server error ${error?.message}`, success: false });
  }
};

exports.getMoviebyId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the movie by ID
    const movie = await movieSchema.findById(id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found', success: false });
    }

    // Return success response with the movie
    res.status(200).json({ movie, success: true });
  } catch (error) {
    // Return error response
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: `Internal server error ${error?.message}`, success: false });
  }
};


