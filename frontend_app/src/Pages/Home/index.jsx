import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { setTotalPageCount } from "../../helper";
import Form from "../Movies/Form";
import { displayErrorToast, displaySuccessToast } from "../../toaster/toaster";
// import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [state, setState] = useState([]); // Track the ID of the movie being edited
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    publishYear: "",
    poster: "",
  });

  const getAllMovies = async () => {
    axios
      .get("http://localhost:8080/movie", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setState(res?.data?.movie))
      .catch((err) => displayErrorToast(err?.response?.data?.message));
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  const editHandler = (id) => {
    navigator(`/edit-movie/${id}`);
  };
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/delete-movie/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setState(state.filter((item) => item._id !== id));
        displaySuccessToast(res?.data?.message);
      })
      .catch((err) => displayErrorToast(err?.response?.data?.message));
  };
  const addHandler = () => {
    navigator("/add-movie");
  };
  const totalpage = setTotalPageCount(10, 5);
  const pageChangeHandler = () => {};
  return (
    <>
      <Form
        setFormData={setFormData}
        getAllMovies={getAllMovies}
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div class="flex justify-end">
        <button  onClick={addHandler} class=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline p-3 m-6">
        {/* <FiPlus />   */}
        Add Movie
        </button>
      </div>
      {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={addHandler}>Add Movie</button> */}
      {state?.map((item) => {
        return (
          <>
            <Card
              setFormData={setFormData}
              showModal={showModal}
              setShowModal={setShowModal}
              item={item}
              name={item?.title}
              publishYear={item?.publishYear}
              src={item?.poster}
              clickOnEditHandler={() => editHandler(item._id)}
              clickOnDeleteHandler={() => deleteHandler(item._id)}
            />
          </>
        );
      })}
      {/* <Pagination
        page={2}
        onPageChangeHandler={pageChangeHandler}
        totalPages={totalpage > 0 ? totalpage : 1}
      /> */}
    </>
  );
};
export default Home;
