import css from "./AllMeals.module.css";
import Meal from "../../Home/MealList/Meal/Meal";
import Entree from "../../Home/MealList/Meal/EntreeList/Entree/Entree";
import PageSection from "../../BasicPageComponents/PageSection/PageSection";
import PageTitle from "../../BasicPageComponents/PageTitle/PageTitle";

const AllMeals = (props) => {
  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <PageTitle title={`Day ${props.dayCount}`} className={css.day} />
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
            {meal.entree && meal.entree.Dish && (
              <Entree
                showMeals={props.showMeals}
                entree={meal.entree.Dish}
                ingredients={meal.entree.Ingredients}
                key={`Entree ${Math.random()}`}
              />
            )}

            {meal.entree && meal.side.Dish && (
              <Entree
                showMeals={props.showMeals}
                entree={meal.side.Dish}
                ingredients={meal.side.Ingredients}
                key={`Entree ${Math.random()}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllMeals;
