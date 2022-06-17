import GroceryList from "./GroceryList/GroceryList";
import { Fragment, useEffect, useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import css from "./ShoppingList.module.css";

const ShoppingList = (props) => {
  const [ingredients, setIngredients] = useState(props.shoppingList);

  useEffect(() => {
    setIngredients(props.shoppingList);
  }, [props.shoppingList]);
  return (
    <div>
      <Fragment>
        <h1 className={css.groceryHeader}>Grocery List</h1>
        <GroceryList
          ingredients={ingredients}
          setIngredients={setIngredients}
          scheduleId={props.scheduleId}
          getNew={props.getNew}
          reload={props.reload}
          setReload={props.setReload}
        />
      </Fragment>
      <div>
        {props.realMeals.length >= 0 && (
          <Fragment>
            <h1 className={css.groceryHeader}>Weekly {props.planText} Plan</h1>
            <WeeklyPlan
              plan={props.realMeals}
              planText="Main"
              mealModuleClasses={props.mealModuleClasses}
            />
          </Fragment>
        )}
      </div>
      <div>
        {props.otherMeals.length >= 0 && (
          <WeeklyPlan
            plan={props.otherMeals}
            planText={props.planText}
            mealModuleClasses={props.mealModuleClasses}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
