import { Fragment, useState, useEffect } from "react";
import $ from "jquery";
import css from "../Form/Form.module.css";
import Card from "../../../UI/Card/Card";
import Input from "../../../UI/Input/Input";
import Label from "../../../UI/Label/Label";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/AppWrapper/WrapComponents/Button/Button";
import Select from "../../../UI/Select/Select";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col } from "react-bootstrap";
import Radial from "../../../UI/Radials/Radial";
import AddIngredients from "../../AddIngredients/AddIngredients";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import POST_ADD from "../../../../Helpers/client_to_api_functions/POST_ADD";

const AddProductForm = (props) => {
  const [ingredientError, setIngredientError] = useState("");
  const [meal, setmeal] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishType, setDishType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const dishes = props.dishes;

  const ingredientsAreValid = ingredients.length > 0;
  const dishTypeIsValid = dishType !== "Entree" && dishType !== "Side";
  const formIsValid =
    dishName !== "" &&
    dishType !== "" &&
    ingredients.length > 0 &&
    dishTypeIsValid;

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    name === "dishName" && setDishName(value);
    name === "meal" && setmeal(value);
    name === "instructions" && setInstructions(value);
    name === "dishType" && setDishType(value);
    name === "ingredient" && setCurrentIngredient(value);
    name === "price" && setCurrentPrice(value);
    name === "instructions" && setInstructions(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendData = {
      Meal: meal,
      DishType: dishType,
      Data: {
        Dish: dishName,
        Ingredients: ingredients,
        Instructions: instructions,
      },
    };

    if (formIsValid === true) {
      const response = await POST_ADD(sendData);
      console.log(response);
    } else {
      console.log("all required fields not filled in...");
    }

    // setDishName("");
    // setInstructions("");
    // setIngredients([]);
  };

  const addIngredients = (event) => {
    const data = { Ingredient: currentIngredient, Price: currentPrice };
    if (event) {
      // console.log("adding Ingredients");
      event.preventDefault();
    }
    if (currentIngredient === "") {
      setIngredientError("You must first give the ingredient a name");
      return;
    }

    setIngredients((prev) => {
      return [...prev, data];
    });
    setIngredientError("");
    setCurrentIngredient("");
    setCurrentPrice("");
  };

  const removeIngredient = (id) => {
    setIngredients((prev) => {
      if (prev.length > -1) {
        return [...prev.splice(id, 1)];
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      $("#addIngredient").click().animate({ backgroundColor: "white" });
    }
  };
  useEffect(() => {
    $(document).ready(function () {
      $(window).on("keydown", function (event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
  });

  return (
    <Fragment>
      <div className={css.spacer}></div>
      <Card className={css.card}>
        <form onSubmit={handleSubmit} className="form">
          <PageSection
            section="Add Your Next Masterpiece"
            className={css.title}
          />
          <Card className={css.formContainer}>
            <div className={css.selectors}>
              <BootStrapGridder>
                <Col md="6">
                  <Input
                    input={{
                      placeholder: "Masterpiece...",
                      id: "dishName",
                      name: "dishName",
                      onChange: handleChange,
                      value: dishName,
                    }}
                    label={{
                      text: "Dish",
                      id: "dishName",
                      name: "dishName-label",
                    }}
                  />
                </Col>

                <Col md="6">
                  <Select
                    choose={false}
                    label="Meal"
                    labelClass={css.label}
                    optionClass={css.selectorsOptions}
                    className={css.selectLeft}
                    onChange={handleChange}
                    options={dishes}
                    htmlSize={100}
                    value={meal}
                    id="meal"
                    name="meal"
                    bsPrefix={css.selectPrefix}
                  />
                </Col>

                {meal !== "choose" && meal !== "" && (
                  <Fragment>
                    <div className={css.radials} name="dishType" id="dishType">
                      <BootStrapGridder>
                        <Col sm="12" md="6">
                          <Radial
                            value="Entrees"
                            text="Main Dish"
                            id="dishType"
                            name="dishType"
                            onChange={handleChange}
                            checked={dishType === "Entrees" ? true : false}
                          />
                        </Col>
                        <Col sm="12" md="6">
                          <Radial
                            value="Sides"
                            text="Side Dish"
                            id="dishType"
                            name="dishType"
                            onChange={handleChange}
                            checked={dishType === "Sides" ? true : false}
                          />
                        </Col>
                      </BootStrapGridder>
                    </div>

                    <AddIngredients
                      ingredientLabel="Ingredient"
                      priceLabel="Price"
                      removeIngredient={removeIngredient}
                      label={{
                        text: "Ingredients",
                        id: "ingredient",
                        name: "ingredient",
                        value: "",
                      }}
                      input={{ text: "Ingredient", onKeyDown: handleKeyDown }}
                      ingredients={ingredients}
                      onClick={addIngredients}
                      onChange={handleChange}
                      priceValue={currentPrice}
                      ingredientValue={currentIngredient}
                      onKeyDown={handleKeyDown}
                      buttonId="addIngredient"
                    />
                    {ingredientError !== "" && <p>{ingredientError}</p>}
                    <div className={css.instructionsDiv}>
                      <div className={css.labelDiv}>
                        <Label
                          text="Instructions:"
                          className={`btn form-control  ${css.instructionsLabel}`}
                        />
                      </div>
                      <TextArea
                        className={css.description}
                        value={instructions}
                        placeholder={`Instructions for making ${dishName}`}
                        id="instructions"
                        name="instructions"
                        handleChange={handleChange}
                      />
                    </div>
                  </Fragment>
                )}
              </BootStrapGridder>
            </div>

            <Button
              type="action"
              text="Add"
              className={`btn btn-secondary ${css.postButton}`}
            />
          </Card>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddProductForm;
