import { useContext, Fragment } from "react";
import css from "./AddIngredients.module.css";
import Ingredient from "./IngredientInput/Ingredient";
import IngredientPrice from "./IngredientInput/IngredientPrice";
import BusinessContext from "../../../store/business-context";
import BootstrapGridder from "../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import Button from "../../UI/Button/PostButton/PostButton";
import Label from "../../UI/Label/Label";

const AddIngredients = (props) => {
  const busiCtx = useContext(BusinessContext);
  const deleter = (event) => {
    const id = event.target.id;
    props.removeIngredient(id);
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
                  <tr
                    key={`Ingredient-Price-Pair ${index}`}
                    onClick={deleter}
                    id={`${index}`}
                  >
                    <td
                      key={`${ingredient.ingredient}|Ingredient:${index}`}
                      className={css.tableIngredient}
                    >
                      {ingredient.Ingredient}
                    </td>
                    <td
                      key={`${ingredient.price}|Price:${index}`}
                      className={css.tablePrice}
                    >
                      {busiCtx.cur}
                      {ingredient.Price}
                    </td>
                  </tr>
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
