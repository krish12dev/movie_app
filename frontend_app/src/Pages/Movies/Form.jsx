// Form.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { displayErrorToast, displaySuccessToast } from "../../toaster/toaster";

const Form = ({
  setShowModal,
  showModal,
  setFormData,
  formData,
  getAllMovies,
}) => {
  const { id } = useParams();
  const [formError, setFormError] = useState({});

  const navigator = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/movie/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          const { movie } = res.data;
          const formattedPublishYear = new Date(movie.publishYear)
            .toISOString()
            .split("T")[0];
          setFormData({
            title: movie.title,
            publishYear: formattedPublishYear,
            poster: movie.poster,
          });
          displaySuccessToast(res?.data?.message);
        })
        .catch((err) => displayErrorToast(err?.response?.data?.message));
    }
  }, [id, setFormData]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter movie name";
    }
    if (!values.publishYear) {
      errors.publishYear = "Add publish year date";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errObj = validate(formData);
    if (Object.keys(errObj).length > 0) {
      setFormError(errObj);
      return;
    }
    if (id) {
      // Update movie if ID is present
      axios
        .patch(`http://localhost:8080/edit-movie/${id}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          getAllMovies();
          setShowModal(false);
          navigator("/");
          displaySuccessToast(res?.data?.message);
        })
        .catch((err) => displayErrorToast(err?.response?.data?.message));
    } else {
      // Add new movie if no ID is present
      axios
        .post("http://localhost:8080/add-movie", formData, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          getAllMovies();
          displaySuccessToast(res?.data?.message);
          setShowModal(false);
          navigator("/");
          setFormData({});
        })
        .catch((err) => displayErrorToast(err?.response?.data?.message));
    }
  };

  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
        <div className="relative w-96 mx-auto" style={{ width: "1000px" }}>
          {/*content*/}
          <div
            style={{ width: "1000px" }}
            className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
          >
            {/*header*/}
            <div className=" p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl w-full font-semibold">
                Add / Update Form
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            <div className="w-full ">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                  <p className="text-red-800 bg-red-50 dark:text-red-400">
                    {formError.title}
                  </p>
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
                  <p className="text-red-800 bg-red-50 dark:text-red-400">
                    {formError.publishYear}
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="poster"
                  >
                    Poster URL
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
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
                    onClick={(e) => handleSubmit(e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    {id ? "Update Movie" : "Add Movie"}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Reset
              </button>
            </div>
          </div>
          {/*footer*/}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};

export default Form;
