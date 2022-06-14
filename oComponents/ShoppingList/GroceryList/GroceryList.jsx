import ToBuy from "./ToBuy/ToBuy";
import css from "./GroceryList.module.css";
import { useState } from "react";
import FilterIngredients from "../../../Helpers/FilterIngredients/FilterIngredients";

const GroceryList = (props) => {
  const data = {};
  const [ingredients, setIngredients] = useState(
    // FilterIngredients(props.ingredients)
    props.filtered
  );

  const checkIngredient = (id) => {
    setIngredients((prev) => {
      if (prev.length > -1) {
        return [...prev.splice(id, 1)];
      }
    });
  };

  return (
    <div>
      <table className={css.table}>
        <tbody className={css.tbody}>
          <tr key="Grocery List Table Index">
            <th className={css.th}></th>
            <th className={css.th}>Ingredients</th>
            <th className={css.th}>Prices</th>
            <th className={css.th}>~Amount</th>
          </tr>

          {ingredients.map((ingredient, index) => {
            return (
              <ToBuy
                onClick={checkIngredient}
                index={index}
                key={`${ingredient._id} | ${index}`}
                id={ingredient._id}
                line={index + 1}
                price={ingredient.price}
                number={ingredient.number}
                ingredient={ingredient.ingredient}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroceryList;

// Previous Example, Works, just make sure the above solves the issues of this one, this went
// directly into return statement, the above is put through a function in previous module
// and then ingredients state is initiated with the data and so they can now be deleted
// without adding a display none class

{
  {
    /* { */
  }
  {
    /* Object.keys(
            props.ingredients.reduce((obj, ingredient) => {
              if (!obj[ingredient.Ingredient]) {
                obj[ingredient.Ingredient] = {
                  price: ingredient.Price,
                  number: 1,
                  _id: ingredient._id,
                  ingredient: ingredient.Ingredient,
                };
              } else {
                obj[ingredient.Ingredient].number++;
              }
              return obj;
            }, data)
          ) */
  }
  /* <ToBuy
                checkIngredient={checkIngredient}
                key={data[ingredient]._id}
                line={index + 1}
                id={data[ingredient]._id}
                ingredient={data[ingredient].ingredient}
                price={data[ingredient].price}
                number={data[ingredient].number}
              /> */
}
