import FoodContext from "../../../../store/food-context";
import { Fragment, useContext, useState } from "react";
import DishPage from "../../../../oComponents/DishPage/DishPage";
const Dish = () => {
  const foodCtx = useContext(FoodContext);
  const [dish, setDish] = useState(foodCtx.currentMeal);
  const currentMeal = foodCtx.currentMeal;
  const updateDish = foodCtx.updateDish;
  const setCurrentMeal = foodCtx.setCurrentMeal;
  // const currentMealIndex = foodCtx.currentMealIndex

  return (
    <Fragment>
      <DishPage
        mealData={currentMeal}
        updateDish={updateDish}
        deleteDish={foodCtx.deleteDish}
        setCurrentMeal={setCurrentMeal}
      />
    </Fragment>
  );
};

export default Dish;
