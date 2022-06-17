import ToBuy from "./ToBuy/ToBuy";
import css from "./GroceryList.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostButton from "../../UI/Button/PostButton/PostButton";
import Card from "../../UI/Card/Card";
import BusinessContext from "../../../store/business-context";

const GroceryList = (props) => {
  const busiCtx = useContext(BusinessContext);
  const [isLoading, setIsLoading] = useState(false);
  const [totalIndiPrice, setTotalIndiPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [ingredients, setIngredients] = useState(props.ingredients);
  // let ingredients = props.ingredients;
  const checkIngredient = (index, id) => {
    props.setIngredients((prev) => {
      const deleteIndex = ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      prev.splice(deleteIndex, 1);
      return [...prev];
    });
  };

  useEffect(() => {
    setIngredients(props.ingredients);
  }, [props.ingredients]);

  const getNewSchedule = async () => {
    setIsLoading(true);
    await props.getNew();
    setIsLoading(false);
  };

  useEffect(() => {
    const price = ingredients.reduce((total, iPrice) => {
      const price = iPrice.price;
      if (price === "undefined" || price === undefined || price.length > 6) {
        return total + 0;
      } else {
        return total + Number(price);
      }
    }, 0);

    const grand = ingredients.reduce((total, iPrice) => {
      const price = iPrice.price;
      const number = iPrice.number;
      if (price === "undefined" || price === undefined || price.length > 6) {
        return total + 0;
      } else {
        return total + Number(price) * Number(number);
      }
    }, 0);

    const numberOfItems = ingredients.reduce((total, iPrice) => {
      const number = iPrice.number;
      if (price === "undefined" || price === undefined || price.length > 6) {
        return total + 0;
      } else {
        return total + Number(number);
      }
    }, 0);
    setNumberOfItems(numberOfItems);
    setGrandTotal(grand);
    setTotalIndiPrice(price);
  }, [ingredients]);

  return (
    <div className={css.main}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        ingredients.length > 0 && (
          <Fragment>
            <table className={css.table} border="1">
              <tbody className={css.tbody}>
                <tr key="Grocery List Table Index" className={css.tr}>
                  <th className={css.th1}>
                    <p class={css.text}>#</p>
                  </th>
                  <th className={css.th2}>
                    <p>Ingredients</p>
                  </th>
                  <th className={css.th}>
                    <p>Prices</p>
                  </th>
                  <th className={css.th}>
                    <p>Amount</p>
                  </th>
                  {/* <th className={css.th}>
                    <p class={css.text}>Total</p>
                  </th> */}
                </tr>

                {ingredients.map((ingredient, index) => {
                  return (
                    <Fragment key={`TableOfIngredients: ${index}`}>
                      <ToBuy
                        onClick={checkIngredient}
                        index={index}
                        key={`${ingredient._id} | ${index}`}
                        id={ingredient.id}
                        line={index + 1}
                        price={ingredient.price}
                        number={ingredient.number}
                        ingredient={ingredient.ingredient}
                      />
                    </Fragment>
                  );
                })}
              </tbody>
            </table>

            <table className={css.table} border="1">
              <tbody>
                <th id={`totalsHeader`}>
                  <th className={css.totalsH}>Totals</th>
                </th>

                <tr id={`totals`} key={`totalIngredientsRow:`}>
                  <th></th>
                  <th>{numberOfItems}</th>

                  <th key={`totalPriceOfIndividualItem:`}>
                    {busiCtx.cur}
                    {grandTotal}
                  </th>
                  <th key={`totalNumberOfItems:`}>{numberOfItems} items</th>
                </tr>
              </tbody>
            </table>
          </Fragment>
        )
      )}
      <div className={css.buttonDiv}>
        <PostButton
          className={css.getNew}
          text="New Schedule"
          onClick={getNewSchedule}
        />
      </div>
    </div>
  );
};

export default GroceryList;

// Previous Example, Works, just make sure the above solves the issues of this one, this went
// directly into return statement, the above is put through a function in previous module
// and then ingredients state is initiated with the data and so they can now be deleted
// without adding a display none class
