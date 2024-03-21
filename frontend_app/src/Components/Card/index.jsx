import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helper";
import Button from "../Button";

const Card = ({
  name,
  publishYear,
  src,
  clickOnDeleteHandler,
  setShowModal,
  showModal,
  setFormData,
  item,
  key
}) => {
  const navigate=useNavigate()
  const editClicked = (key) => {
    console.log({item});
    const formattedPublishYear = new Date(publishYear)
    .toISOString()
    .split("T")[0];
    setShowModal(true);
    setFormData({
      title:name,
      publishYear:formattedPublishYear,
      poster:src
    })
    if(item?._id){

      navigate(`/${item?._id}`)
    }
  };
  return (
    <div className="m-4">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
        <img className="rounded-t-lg h-30" src={src} alt="" />
        <div className="p-5">
          <p>Movie : {name}</p>
          <p>Published Date : {formatDate(publishYear || "")}</p>
        </div>
        <div className="flex w-32">
          <Button
            className={
              "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            }
            title={"Edit"}
            clickButtonHandler={() => editClicked(key)}
          />
          <Button
            className={
              "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            }
            title={"Delete"}
            clickButtonHandler={clickOnDeleteHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
