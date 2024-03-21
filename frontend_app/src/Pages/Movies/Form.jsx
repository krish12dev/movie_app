// Form.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    publishYear: "",
    poster: "",
  });
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/movie/${id}`)
        .then((res) => {
          setFormData(res.data.movie);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update movie if ID is present
      axios
        .patch(`http://localhost:8080/edit-movie/${id}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.error(err));
      navigator("/");
    } else {
      // Add new movie if no ID is present
      axios
        .post("http://localhost:8080/add-movie", formData, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.error(err));
    }
    navigator("/");
  };

  return (
    <div className="w-full ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Movie Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Movie Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publishYear"
          >
            Publish Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="publishYear"
            type="date"
            placeholder="Publish Year"
            name="publishYear"
            value={formData.publishYear}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="poster"
          >
            Poster URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="poster"
            type="url"
            placeholder="Poster URL"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {id ? "Update Movie" : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
