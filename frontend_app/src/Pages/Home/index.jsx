import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { setTotalPageCount } from "../../helper";
import Form from "../Movies/Form";
import { MdAdd } from "react-icons/md";
import { displayErrorToast, displaySuccessToast } from "../../toaster/toaster";
// import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [state, setState] = useState([]); // Track the ID of the movie being edited
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    publishYear: "",
    poster: "",
  });
  const [page, setPage] = useState(1);
  console.log({ totalPages });

  const getAllMovies = async (page) => {
    axios
      .get(`http://localhost:8080/movie?page=${page}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotalPages(res?.data?.totalPages);
        setState(res?.data?.movie);
      })
      .catch((err) => displayErrorToast(err?.response?.data?.message));
  };
  useEffect(() => {
    getAllMovies(page);
  }, [page]);
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
    setShowModal(true);
  };

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
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addHandler}
          className="w-40 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <div className="flex">
            <MdAdd className="flex-none" size={"30px"} />
            <span className="flex-1 mt-1">Add Movie</span>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {" "}
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
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(totalPages / 3)}
        onPageChangeHandler={pageChangeHandler}
      />
    </>
  );
};
export default Home;
