import { Fragment, useContext } from "react";
import IngredientsPage from "../../oComponents/IngredientsPage/IngredientsPage";
import FoodContext from "../../store/food-context";

const Ingredients = () => {
  const foodCtx = useContext(FoodContext);
  const allIngredients = foodCtx.allIngredients;

  return (
    <Fragment>
      <IngredientsPage ingredients={allIngredients} />
    </Fragment>
  );
};

export default Ingredients;
