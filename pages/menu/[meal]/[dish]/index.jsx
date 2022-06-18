import FoodContext from "../../../../store/food-context";
import { Fragment, useContext } from "react";
import DishPage from "../../../../oComponents/DishPage/DishPage";
const Dish = () => {
  const foodCtx = useContext(FoodContext);
  let mealData = foodCtx.currentMeal;
  const updateDish = foodCtx.updateDish;

  return (
    <Fragment>
      <DishPage
        mealData={mealData}
        updateDish={updateDish}
        deleteDish={foodCtx.deleteDish}
      />
    </Fragment>
  );
};

export default Dish;
