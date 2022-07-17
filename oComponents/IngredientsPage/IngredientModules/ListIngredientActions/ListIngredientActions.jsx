import { Fragment, useState } from "react";
import css from "./ListIngredientActions.module.css";
import IngredientDisplay from "../IngredientDisplay/IngredientDisplay";
import AddIngredient from "../../AddIngredient/AddIngredient";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col, Row } from "react-bootstrap";
import { SORT2 } from "../../../../Helpers/GeneralPurpose/SORT";

const ListIngredientActions = (props) => {
  const [ingredients, setIngredients] = useState(() => {
    return SORT2(props.ingredients, "ingredient", "name");
  });

  const addIngredientToList = (ingredient) => {
    setIngredients((prev) => {
      return [...prev, ingredient];
    });
  };

  const setIgredientData = (set1, data1, set2, data2) => {
    set1(data1);
    set2(data2);
  };

  // const updateIngredientList = (index, ingredient) => {
  //   const new_ingredients = ingredients;
  //   const fixedIngredient = { ingredient: { ...ingredient } };
  //   console.log("index,", index);
  //   console.log("ingredient,", ingredient);
  //   const data = new_ingredients.splice(index, 1, fixedIngredient);
  //   const new_list = SORT2(new_ingredients, "ingredient", "name");
  //   console.log(data);
  //   console.log(new_list);
  //   // const setIgredientData = (set1, set2) => {
  //   //   set1()
  //   // }

  //   // setIngredients((prev) => {
  //   //   const data = prev.splice(index, 1, ingredient);
  //   //   const new_list = SORT2(prev);
  //   //   console.log(data);
  //   //   console.log(new_list);
  //   //   return [SORT2(prev)];
  //   // });
  // };

  const deleteIngredientAfterDelete = (id) => {
    setIngredients((prev) => {
      prev.splice(id, 1);
      return [...prev];
    });
  };

  return (
    <Fragment>
      <BootStrapGridder>
        <AddIngredient addIngredientToList={addIngredientToList} />
        {ingredients &&
        ingredients.length > 0 &&
        ingredients[0].ingredient &&
        ingredients[0].ingredient.name ? (
          ingredients.map((ingredient_data, index) => {
            return (
              <Col xs="12" sm="6" key={`${index}||${ingredient_data._id}`}>
                <IngredientDisplay
                  setIngredientData={setIgredientData}
                  deleteIngredientAfterDelete={deleteIngredientAfterDelete}
                  // updateIngredientList={updateIngredientList}
                  index={index}
                  ingredient={
                    ingredient_data.ingredient &&
                    ingredient_data.ingredient.name
                      ? ingredient_data.ingredient.name
                      : null
                  }
                  price={ingredient_data.ingredient.price}
                  key={ingredient_data._id}
                  _id={ingredient_data._id}
                />
              </Col>
            );
          })
        ) : (
          <p className={css.noIngredients}>
            Add an ingredient so this message will go away...
          </p>
        )}
      </BootStrapGridder>
    </Fragment>
  );
};

export default ListIngredientActions;
