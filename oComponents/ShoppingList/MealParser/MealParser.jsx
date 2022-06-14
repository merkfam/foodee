import { Fragment, useCallback, memo, useContext } from "react";
import WeeklyPlan from "../WeeklyPlan/WeeklyPlan";
import GroceryList from "../GroceryList/GroceryList";

// memo(
const MealParser = (props) => {
  return (
    <Fragment>
      {props.meals.length > -1 ? (
        <Fragment>
          <GroceryList filtered={props.ingredients} />

          <WeeklyPlan
            plan={props.meals}
            planText={props.planText}
            mealModuleClasses={props.mealModuleClasses}
          />
        </Fragment>
      ) : (
        <h1>No Meals Were Found In Your Database, Sorry!</h1>
      )}
    </Fragment>
  );
};
// else {
//   console.log("nada");
//   console.log(data);
// }
// };
// , []);

export default MealParser;
