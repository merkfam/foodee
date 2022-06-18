import { useContext, Fragment } from "react";
import css from "./AddIngredients.module.css";
import Ingredient from "./IngredientInput/Ingredient";
import IngredientPrice from "./IngredientInput/IngredientPrice";
import BusinessContext from "../../../store/business-context";
import BootstrapGridder from "../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import Button from "../../UI/Button/PostButton/PostButton";
import Label from "../../UI/Label/Label";
// import ToBuy from "../../ShoppingList/GroceryList/ToBuy/ToBuy";
import FormIngredientList from "./FormIngredient/FormIngredientList";

const AddIngredients = (props) => {
  const busiCtx = useContext(BusinessContext);
  const deleter = (index) => {
    props.removeIngredient(index);
  };

  return (
    <div>
      <div className={css.labelDiv}>
        <Label
          text={props.label.text}
          className={`btn form-control  ${css.mainLabel}`}
        />
      </div>
      <BootstrapGridder>
        <Col xs="12" md="5">
          <Ingredient
            label={props.ingredientLabel}
            input={props.input}
            onChange={props.onChange}
            value={props.ingredientValue}
            onKeyDown={props.onKeyDown}
          />
        </Col>
        <Col xs="12" md="5">
          <IngredientPrice
            value={props.priceValue}
            onChange={props.onChange}
            label={props.priceLabel}
            onKeyDown={props.onKeyDown}
          />
        </Col>
        <Col>
          <Button
            id={props.buttonId}
            onClick={props.onClick}
            text="+"
            type="button"
            className={`btn btn-primary ${css.button}`}
            onKeyDown={props.onKeyDown}
          />
        </Col>
      </BootstrapGridder>

      {props.ingredients.length > 0 ? (
        <div className={css.ingredientsDiv}>
          <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Ingredient Price Header">
                <th className={css.th}>Ingredients</th>
                <th className={css.th}>Prices</th>
              </tr>
              {props.ingredients.map((ingredient, index) => {
                return (
                  <FormIngredientList
                    onClick={deleter}
                    index={index}
                    key={`${ingredient._id} | ${index}`}
                    id={ingredient.id}
                    line={index + 1}
                    price={ingredient.price}
                    number={ingredient.number}
                    ingredient={ingredient.ingredient}
                    hide={true}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AddIngredients;
