import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { setTotalPageCount } from "../../helper";

const Home = () => {
  const [state, setState] = useState([]);// Track the ID of the movie being edited
  const [formData, setFormData] = useState({
      title: "",
      publishYear: "",
      poster: ""
  });
  const {id} = useParams()
  const navigator = useNavigate()
  useEffect(() => {
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
  }, []);
  const editHandler = (id) => {
    const movieToEdit = state.find(movie => movie._id === id);
    setFormData({
      title: movieToEdit.title,
      publishYear: movieToEdit.publishYear,
      poster: movieToEdit.poster
    });
    navigator(`/edit-movie/${id}`);
  };
  console.log(formData)
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
  const addHandler =() =>{
    navigator("/add-movie")
  }
  const totalpage = setTotalPageCount(10,5)
  const pageChangeHandler=()=>{}
  return (
    <>
    <button onClick={addHandler}>Add Movie</button>
      {state?.map((item) => {
        return (
          <>
            <Card
              key={item._id}
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
          totalPages={
            totalpage > 0
              ? totalpage
              : 1
          }
        />
    </>
  );
};
export default Home;
