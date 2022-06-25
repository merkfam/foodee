import { Fragment } from "react";
import css from "./ListIngredientActions.module.css";
import IngredientDisplay from "../IngredientDisplay/IngredientDisplay";
import AddIngredient from "../../AddIngredient/AddIngredient";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col, Row } from "react-bootstrap";

const ListIngredientActions = (props) => {
  return (
    <Fragment>
      {props.ingredients &&
        props.ingredients[0] &&
        props.ingredients[0].ingredient.name && (
          <BootStrapGridder>
            <AddIngredient />

            {props.ingredients.map((ingredient_data, index) => {
              return (
                <Col xs="12" sm="6" key={`${index}||${ingredient_data._id}`}>
                  <IngredientDisplay
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
            })}
          </BootStrapGridder>
        )}
    </Fragment>
  );
};

export default ListIngredientActions;
