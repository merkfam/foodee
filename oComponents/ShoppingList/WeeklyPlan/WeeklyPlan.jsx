import { Fragment } from "react";
import DailyMeals from "../DailyMeals/DailyMeals";

const WeeklyPlan = (props) => {
  return (
    <Fragment>
      <h1>Weekly {props.planText} Plan</h1>
      {props.plan.map((day, index) => {
        return (
          <DailyMeals
            key={Math.random() * (index + 1) + Math.random()}
            day={index + 1}
            meals={day}
            mealModuleClasses={props.mealModuleClasses}
          />
        );
      })}
    </Fragment>
  );
};

export default WeeklyPlan;
