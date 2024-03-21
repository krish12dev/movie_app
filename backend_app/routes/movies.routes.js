
const verifyToken = require("../authentication/auth");
const { addMovie, editMovie, deleteMovie, getMovie } = require("../controllers/movieController");

module.exports = function (app) {
  app.post("/add-movie", verifyToken, addMovie);
  app.patch("/edit-movie/:id", verifyToken,editMovie)
  app.delete("/delete-movie/:id",verifyToken,deleteMovie)
  app.get("/movie",verifyToken,getMovie)
};


