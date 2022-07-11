import { useRouter } from "next/router";
import Meal from "../../../oComponents/Home/MealList/Meal/Meal";
import FoodContext from "../../../store/food-context";
import { useContext } from "react";

const MealPage = (props) => {
  const router = useRouter();
  const foodCtx = useContext(FoodContext);
  const menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];
  let currentMeal = router.query.meal;
  const meal = router.query.meal;

  // console.log("menu,", menu);

  let final = menu.filter((meals) => {
    return meals.meal === meal;
  });

  // console.log("final,", final);

  final = final[0];
  // console.log("final[0],", final);

  const showMeals = true;
  const showMealType = true;
  const entreeClasses = {};
  const entreeListClasses = { entree: entreeClasses };
  const sideClasses = {};
  const sideListClasses = { side: sideClasses };

  const dishClass = {};
  const headersClasses = {};

  const mealModuleClasses = {
    entrees: entreeListClasses,
    sides: sideListClasses,
    dish: dishClass,
    headers: headersClasses,
    show: { meals: showMeals, mealType: showMealType },
  };

  const deleteDish = foodCtx.deleteDish;

  const setCurrentMeal = foodCtx.setCurrentMeal;

  return (
    <Meal
      setCurrentMeal={setCurrentMeal}
      entrees={final && typeof final.entrees === "object" && final.entrees}
      sides={final && typeof final.sides === "object" && final.sides}
      key={Math.random()}
      meal={final && final.meal ? final.meal : currentMeal}
      mealModuleClasses={mealModuleClasses}
      deleteDish={deleteDish}
    />
  );
};

export default MealPage;
