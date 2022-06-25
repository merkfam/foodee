import css from "./DishPage.module.css";
import { Fragment, useState, useContext } from "react";
import Dish from "./Dish";
import Button from "../UI/Button/PostButton/PostButton";
import Modal from "../UI/Modal/Modal0";
import { useRouter } from "next/router";
import Form3 from "../AddDishForm/Components/Form/Form3";
import FoodContext from "../../store/food-context";

const DishPage = (props) => {
  const foodCtx = useContext(FoodContext);
  const ingredientList = foodCtx.allIngredients;
  const data = props.mealData;
  const router = useRouter();

  const [edit, setEdit] = useState("false");
  const [editText, setEditText] = useState("Edit");
  const [showModal, setShowModal] = useState(false);

  const updateDishHandler = async (data) => {
    const mealId = props.mealData.id;
    data = { ...data, _id: mealId };
    console.log("Updating...");
    console.log(data);
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
      {data ? (
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
          <div className={css.buttonContainer}>
            <Button
              text="Delete"
              onClick={confirm}
              className={`btn btn-secondary ${css.buttonDelete}`}
            />
            <Button
              text={editText}
              onClick={pushEdit}
              className={`btn btn-secondary ${css.buttonEdit}`}
            />
          </div>
          {editText === "Cancel" ? (
            <Fragment>
              <Form3
                meal={data.meal}
                ingredients={data.ingredients}
                name={data.dish}
                instructions={data.instructions}
                mealType={data.mealType}
                dishType={data.dishType}
                id={data.id}
                updateDish={updateDishHandler}
                options={ingredientList}
              />
            </Fragment>
          ) : (
            <Dish
              entree={data.dish}
              ingredients={data.ingredients}
              key={`Entree ${Math.random()}`}
              meal={data.meal}
              dishType={data.dishType}
              mealType={data.mealType}
              id={data._id}
              instructions={data.instructions}
              setCurrentMeal={props.setCurrentMeal}
            />
          )}
        </Fragment>
      ) : (
        <h1>Please Try Again.</h1>
      )}
    </Fragment>
  );
};

export default DishPage;
