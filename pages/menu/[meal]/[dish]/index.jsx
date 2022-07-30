import FoodContext from "../../../../store/food-context";
import { useContext } from "react";
import DishPage from "../../../../oComponents/DishPage/DishPage";
import AuthGuard from "../../../../Helpers/AuthGuard/AuthGuard";

const Dish = () => {
  const foodCtx = useContext(FoodContext);
  const currentMeal = foodCtx.currentMeal;
  const updateDish = foodCtx.updateDish;
  const setCurrentMeal = foodCtx.setCurrentMeal;

  return (
    <AuthGuard currentMeal={currentMeal}>
      <DishPage
        mealData={currentMeal}
        updateDish={updateDish}
        deleteDish={foodCtx.deleteDish}
        setCurrentMeal={setCurrentMeal}
      />
    </AuthGuard>
  );
};

export default Dish;
