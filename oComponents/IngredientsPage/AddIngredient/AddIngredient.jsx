import { useState, useContext } from "react";
import FoodContext from "../../../store/food-context";
import css from "./AddIngredient.module.css";
import Input from "../../UI/Input/Input";
import PostButton from "../../UI/Button/PostButton/PostButton";
import { Col, Row } from "react-bootstrap";
import PageSection from "../../BasicPageComponents/PageSection/PageSection";

const AddIngredient = () => {
  const foodCtx = useContext(FoodContext);
  const addIngredient = foodCtx.addNewIngredient;
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    name === "ingredient" && setIngredient(value);
    name === "price" && setPrice(+value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const sendData = { ingredient: ingredient, price: price };
    addIngredient(sendData);
    console.log(sendData);
  };

  return (
    <div className={css.addIngredientDiv}>
      <Row>
        <Col xs="5" md="6">
          <PageSection section="Ingredient" className={css.ingredientText} />
          <Input
            input={{
              text: "Ingredient",
              name: "ingredient",
              placeholder: "new ingredient...",
              id: "AddNewIngredientInput",
              className: css.ingredientInput,
              value: ingredient,
              onChange: handleChange,
            }}
          />
        </Col>

        <Col xs="4">
          <PageSection section="Price" className={css.priceText} />
          <Input
            input={{
              type: "number",
              name: "price",
              text: "Price",
              placeholder: "price...",
              id: "AddNewPriceInput",
              className: css.priceInput,
              value: price,
              onChange: handleChange,
            }}
          />
        </Col>
        <Col xs="2">
          <PostButton
            text="Add"
            className={css.addButton}
            onClick={handleAdd}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddIngredient;
