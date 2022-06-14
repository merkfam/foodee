import css from "./AllMeals.module.css";
import Meal from "../../Home/MealList/Meal/Meal";
import PageSection from "../../BasicPageComponents/PageSection/PageSection";
import PageTitle from "../../BasicPageComponents/PageTitle/PageTitle";

const AllMeals = (props) => {
  // const { entrees, sides, dish, headers, show } = props.mealModuleClasses;
  // console.log("meals");
  // console.log(props.meals);

  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <PageTitle title={`Day ${props.day}`} className={css.day} />
      </div>

      {props.meals.map((meal, index) => {
        const mealName = meal.meal;

        return (
          <div key={`MealListContainer ${Math.random() * Math.random()}`}>
            <div className={css.mealDiv}>
              <PageSection
                key={index * Math.random()}
                section={mealName}
                className={css.meal}
              />
            </div>

            <Meal
              meal={mealName}
              entrees={[meal.entree]}
              sides={[meal.side]}
              key={`MealListMeal ${Math.random() * Math.random()}`}
              mealModuleClasses={props.mealModuleClasses}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllMeals;
