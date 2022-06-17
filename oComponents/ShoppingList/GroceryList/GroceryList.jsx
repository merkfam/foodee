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
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        ingredients.length > 0 && (
          <Fragment>
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
                      {index === ingredients.length - 1 && (
                        <tr
                          id={`totals`}
                          index={props.index}
                          key={`totalIngredientsRow: ${index}`}
                        >
                          <th key={`totalItems: ${index}`}>
                            <Card>Totals </Card>
                          </th>
                          <th key={`totalIngredients: ${index}`}>
                            <Card className={css.ingredient}>
                              Items: {index + 1}
                            </Card>
                          </th>
                          <th key={`totalPrice: ${index}`}>
                            <Card className={css.ingredient}>
                              {busiCtx.cur}: {totalIndiPrice}
                            </Card>
                          </th>
                          <th key={`totalNumberOfItems: ${index}`}>
                            <Card>{numberOfItems}</Card>
                          </th>
                          <th key={`totalPriceOfIndividualItem: ${index}`}>
                            <Card>{grandTotal}</Card>
                          </th>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
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
