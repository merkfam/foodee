import css from "./IngredientDisplay.module.css";
import IngredientActionButtons from "../IngredientActionButtons/IngredientActionButtons";
import { useState, useContext } from "react";
import FoodContext from "../../../../store/food-context";
import Input from "../../../UI/Input/Input";
import { Col, Row } from "react-bootstrap";
import PostButton from "../../../UI/Button/PostButton/PostButton";
import BusinessContext from "../../../../store/business-context";
import Modal from "../../../UI/Modal/Modal0";

const IngredientDisplay = (props) => {
  const foodCtx = useContext(FoodContext);
  const busiCtx = useContext(BusinessContext);

  const [edit, setEdit] = useState("cancel");
  const [orPrice, setOrPrice] = useState(props.price);
  const [orIngredient, setOrIngredient] = useState(props.ingredient);

  const [newPrice, setNewPrice] = useState(props.price);
  const [newIngredient, setNewIngredient] = useState(props.ingredient);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const verifyUpdate = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const editHandler = () => {
    if (edit === "edit") {
      setEdit("cancel");
    } else {
      setEdit("edit");
    }
  };

  const updateHandler = () => {
    const data = {
      _id: props._id,
      name: newIngredient,
      price: newPrice,
    };
    setShowUpdateModal(false);
    foodCtx.updateIngredient(data);
    console.log("updating...");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    name === "newIngredient" && setNewIngredient(value);
    name === "newPrice" && setNewPrice(value);
  };

  const verifyDelete = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteHandler = () => {
    const data = {
      _id: props._id,
      name: props.ingredient,
      price: props.price,
    };
    setShowDeleteModal(false);
    foodCtx.deleteIngredient(data);
    props.deleteIngredientAfterDelete(props.index);
  };

  return (
    <div
      className={
        props.index === 0 || props.index === 1
          ? props.index % 2 === 0
            ? `${css.fullDiv} ${css.separate1}`
            : `${css.fullDiv} ${css.separate1} ${css.partition}`
          : props.index % 2 === 0
          ? `${css.fullDiv} ${css.separate2}  ${css.partition}`
          : `${css.fullDiv} ${css.separate1} ${css.partition}`
      }
    >
      <Modal
        show={showDeleteModal}
        title="Warning!"
        message={`Are You Sure You Want To Delete ${orIngredient} for ${busiCtx.cur}${orPrice}?`}
        okayButton="Delete"
        closeButton="Cancel"
        handleNo={closeDeleteModal}
        handleYes={deleteHandler}
      />

      <Modal
        show={showUpdateModal}
        title="Warning!"
        message={`Are You Sure You Want To Update ${orIngredient} at ${busiCtx.cur}${orPrice} to ${newIngredient} ${busiCtx.cur}${newPrice}?`}
        okayButton="Update"
        closeButton="Cancel"
        handleNo={closeUpdateModal}
        handleYes={updateHandler}
      />
      {edit === "cancel" ? (
        <table className={`${css.table}`}>
          <tbody>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td className={css.td}>
                <div className={css.displayTextContainer}>
                  <p className={css.p}>{orIngredient}</p>
                </div>
              </td>
              <td className={css.td}>
                <div className={css.displayTextContainer}>
                  <p className={css.p}>
                    {busiCtx.cur}
                    {orPrice}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          <Row>
            <Col xs="5" sm="4">
              <Input
                input={{
                  text: "Ingredient",
                  name: "newIngredient",
                  placeholder: "new ingredient...",
                  id: "AddNewIngredientInput",
                  className: css.ingredientInput,
                  value: newIngredient,
                  onChange: handleChange,
                }}
              />
            </Col>
            <Col xs="4" sm="4" md="4">
              <Input
                input={{
                  type: "number",
                  name: "newPrice",
                  text: "Price",
                  placeholder: "price...",
                  id: "AddNewPriceInput",
                  className: css.priceInput,
                  value: newPrice,
                  onChange: handleChange,
                }}
              />
            </Col>
            <Col xs="2" sm="4" md="4">
              <PostButton
                text="Update"
                className={css.addButton}
                onClick={verifyUpdate}
              />
            </Col>
          </Row>
        </>
      )}
      <div className={css.actionDiv}>
        <IngredientActionButtons
          data={props}
          editValue={edit === "edit" ? "Cancel" : "Edit"}
          deleteValue="Delete"
          onEdit={editHandler}
          onDelete={verifyDelete}
          className={css.actionButtons}
        />
      </div>
      <hr className={css.hr}></hr>
    </div>
  );
};

export default IngredientDisplay;
