import MealParser from "./MealParser/MealParser";
import { useContext } from "react";
import FoodContext from "../../store/food-context";

const ShoppingList = (props) => {
  const foodCtx = useContext(FoodContext);
  const list = props.shoppingList;
  const realMeals = foodCtx.MainMeals.list;
  const ingredients = foodCtx.MainMeals.ingredients;

  // const realMeals = list.filter((meal) => {
  //   if (meal.Meal !== "Snack" && meal.Meal !== "Dessert") {
  //     return meal;
  //   }
  // });
  // // console.log("realMeals below:");
  // // console.log(realMeals);

  // const otherMeals = list.filter((meal) => {
  //   if ((meal.Meal === "Snack") | (meal.Meal === "Dessert")) {
  //     return meal;
  //   }
  // });

  setTimeout(() => {
    return;
  }, 2000);
  return (
    <div>
      <div key={Math.random()}>
        <MealParser
          meals={realMeals}
          ingredients={ingredients}
          planText="Meal"
          showMeals={props.showMeals}
          showMealType={props.showMealType}
          mealModuleClasses={props.mealModuleClasses}
        />
      </div>
      {/* <div key={Math.random()}>
        <MealParser
          // meals={otherMeals}
          days={props.otherDays}
          planText="Snack"
          showMeals={props.showMeals}
          showMealType={props.showMealType}
          mealModuleClasses={props.mealModuleClasses}
        />
      </div> */}
    </div>
  );
};

export default ShoppingList;
