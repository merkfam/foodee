import { Fragment, useState } from "react";
import css from "./ListIngredientActions.module.css";
import IngredientDisplay from "../IngredientDisplay/IngredientDisplay";
import AddIngredient from "../../AddIngredient/AddIngredient";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col, Row } from "react-bootstrap";

const ListIngredientActions = (props) => {
  const [ingredients, setIngredients] = useState(props.ingredients);

  const addIngredientToList = (ingredient) => {
    setIngredients((prev) => {
      return [...prev, ingredient];
    });
  };

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
          ingredients
            .sort((a, b) => {
              var textA = a.ingredient.name;
              var textB = b.ingredient.name;
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((ingredient_data, index) => {
              return (
                <Col xs="12" sm="6" key={`${index}||${ingredient_data._id}`}>
                  <IngredientDisplay
                    deleteIngredientAfterDelete={deleteIngredientAfterDelete}
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
