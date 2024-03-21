import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { setTotalPageCount } from "../../helper";
import Form from "../Movies/Form";

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
      .catch((err) => {
        return err;
      });
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
        console.log(res);
        setState(state.filter((item) => item._id !== id));
      })
      .catch((err) => err);
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
      <button onClick={addHandler}>Add Movie</button>
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
      <Pagination
        page={2}
        onPageChangeHandler={pageChangeHandler}
        totalPages={totalpage > 0 ? totalpage : 1}
      />
    </>
  );
};
export default Home;
