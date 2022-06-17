import { Fragment, useCallback, memo, useContext } from "react";
import WeeklyPlan from "../WeeklyPlan/WeeklyPlan";
import GroceryList from "../GroceryList/GroceryList";

// memo(
const MealParser = (props) => {
  return (
    <Fragment>
      {props.meals.length > -1 && props.mealData !== "other" && (
        <Fragment>
          <GroceryList filtered={props.ingredients} />
        </Fragment>
      )}
      <WeeklyPlan
        plan={props.meals}
        planText={props.planText}
        mealModuleClasses={props.mealModuleClasses}
      />
    </Fragment>
  );
};

export default MealParser;
