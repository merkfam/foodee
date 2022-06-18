import css from "./DishPage.module.css";
import { Fragment, useContext, useState } from "react";
import BusinessContext from "../../store/business-context";
import Button from "../UI/Button/PostButton/PostButton";
import Modal from "../UI/Modal/Modal0";
import { useRouter } from "next/router";
import Form2 from "../AddDishForm/Components/Form/Form2";

const DishPage = (props) => {
  const data = props.mealData;
  console.log(data);
  const router = useRouter();

  const [edit, setEdit] = useState("false");
  const [editText, setEditText] = useState("Edit");
  const [showModal, setShowModal] = useState(false);

  const updateDish = async (data) => {
    props.updateDish(data);
  };

  const confirm = () => {
    setShowModal(true);
  };

  const handleNo = () => {
    setShowModal(false);
  };

  const deleteDish = async () => {
    const sendData = {
      meal: data.meal,
      dishType: data.dishType,
      id: data.id,
      name: data.dish,
    };

    props.deleteDish(sendData);
    setShowModal(false);
    const redirect = `/menu/${router.query.meal}`;
    router.push(redirect);
  };

  const pushEdit = () => {
    if (edit === "false") {
      setEdit("true");
      setEditText("Cancel");
    } else {
      setEdit("false");
      setEditText("Edit");
    }
  };

  return (
    <Fragment>
      {data.dish ? (
        <Fragment>
          <Modal
            title="Confirm Delete"
            message="Are you sure you'd like to delete the selected item?"
            show={showModal}
            okayButton="Sure"
            closeButton="No"
            handleNo={handleNo}
            handleYes={deleteDish}
          />
          <Button text={editText} onClick={pushEdit} />
          <Button text="Delete" onClick={confirm} />
          <Form2
            meal={data.meal}
            ingredients={data.ingredients}
            name={data.dish}
            instructions={data.instructions}
            mealType={data.mealType}
            dishType={data.dishType}
            id={data.id}
            updateDish={updateDish}
          />
        </Fragment>
      ) : (
        <h1>Please Try Again.</h1>
      )}
    </Fragment>
  );
};

export default DishPage;
