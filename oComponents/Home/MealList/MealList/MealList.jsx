import css from "./MealList.module.css";
import Meal from "../Meal/Meal";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";

const MealList = (props) => {
  // console.log(props.meals);
  return (
    <div
      className={`${css.mealListOuterDiv}`}
      key={Math.random() * Math.random()}
    >
      {props.meals.map((meal, index) => {
        return (
          <div key={`MealListContainer ${Math.random() * Math.random()}`}>
            <div className={css.sectionDiv}>
              <PageSection key={index * Math.random()} section={meal.Meal} />
            </div>

            <Meal
              mealModuleClasses={props.mealModuleClasses}
              showDishType={props.showDishType}
              meal={meal.Meal}
              entrees={meal.Entrees}
              sides={meal.Sides}
              key={`MealListMeal ${Math.random() * Math.random()}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MealList;
