import { createContext, Fragment, useEffect, useState } from "react";
import FilterIngredients from "../Helpers/FilterIngredients/FilterIngredients";

const FoodContext = createContext({
  Breakfast: [],
  Lunch: [],
  Dinner: [],
  Snack: [],
  Dessert: [],
  MainMeals: {
    list: [],
    ingredients: [],
  },
  OtherMeals: {
    list: [],
    ingredients: [],
  },
});

export const FoodContextProvider = (props) => {
  const [id, setId] = useState();
  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();
  const [snack, setSnack] = useState();
  const [dessert, setDessert] = useState();
  const [weeklyIngredients, setWeeklyIngredients] = useState([]);

  const getMenu = async () => {
    try {
      const data = await fetch("/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const final = await data.json();
      const { _id, Breakfast, Lunch, Dinner, Snack, Dessert } = final;
      setBreakfast(Breakfast);
      setLunch(Lunch);
      setDinner(Dinner);
      setSnack(Snack);
      setDessert(Dessert);
      setId(_id);
      return final;
    } catch (err) {
      console.log("There was an error receiving data from the server...");
      console.log(err);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const fullMeals =
    breakfast !== undefined && breakfast !== "undefined"
      ? [breakfast, lunch, dinner]
      : null;
  const otherMeals =
    snack !== undefined && snack !== "undefined" ? [snack, dessert] : null;

  const this_weeks_full_meals = () => {
    const dailyList = [];
    const allIngredients = [];
    for (let day = 0; day < 7; day++) {
      const dayList = [];
      for (let i = 0; i < fullMeals.length; i++) {
        const meal = fullMeals[i];

        const entreeRand = Math.floor(Math.random() * meal.Entrees.length);
        const sideRand = Math.floor(Math.random() * meal.Sides.length);

        const entree = meal.Entrees[entreeRand];

        const side = meal.Sides[sideRand];

        dayList.push({ meal: meal.Meal, entree: entree, side: side });
      }

      dailyList.push(dayList);
    }
    console.log("main meals daily list");
    console.log(dailyList);
    dailyList.forEach((day) => {
      day.forEach((meal) => {
        meal.entree.Ingredients.forEach((ingredient) => {
          allIngredients.push(ingredient);
        });
        meal.side.Ingredients.forEach((ingredient) => {
          allIngredients.push(ingredient);
        });
      });
    });
    return [dailyList, allIngredients];
  };

  const this_weeks_other_meals =
    otherMeals === null || otherMeals.Entrees === []
      ? null
      : () => {
          const dailyList = [];
          const allIngredients = [];
          for (let day = 0; day < 3; day++) {
            const dayList = [];
            for (let i = 0; i < otherMeals.length; i++) {
              const meal = otherMeals[i];

              const entreeRand = Math.floor(
                Math.random() * meal.Entrees.length
              );
              const sideRand = Math.floor(Math.random() * meal.Sides.length);

              const entree = meal.Entrees[entreeRand];

              const side = meal.Sides[sideRand];

              dayList.push({ meal: meal.Meal, entree: entree, side: side });
            }

            dailyList.push(dayList);
          }
          console.log("dailyList.entree");
          console.log(dailyList.entree);
          console.log(dailyList);
          // if (dailyList.entree) {
          dailyList.forEach((day) => {
            if (day.entree || day.side) {
              day.forEach((meal) => {
                meal.entree.Ingredients.forEach((ingredient) => {
                  if (ingredient === "undefined") {
                    return;
                  }
                  allIngredients.push(ingredient);
                });
                meal.side.Ingredients.forEach((ingredient) => {
                  allIngredients.push(ingredient);
                });
              });
            }
          });
          // }
          return [dailyList, allIngredients];
        };

  // getting a filtered ingredients list so that they don't repeat themselves
  // also have to check for dataTypes so that i don't try anything before the server responds

  console.log("food-context");
  const [dailyMainMenuList, fullIngredients] =
    fullMeals === null ? [null, null] : this_weeks_full_meals();

  const weekly_full_ingredients =
    fullIngredients !== null && fullIngredients !== null
      ? FilterIngredients(fullIngredients)
      : {};

  // Fix This one, the function has issues when they are empty arrays

  console.log("otherMeals below");
  console.log(otherMeals);
  const [dailyOtherList, otherIngredients] =
    otherMeals === null || otherMeals === "undefined"
      ? [null, null]
      : this_weeks_other_meals();
  const weekly_other_ingredients =
    fullIngredients !== null && fullIngredients !== null
      ? FilterIngredients(otherIngredients)
      : {};

  const contexValue = {
    id: id,
    Breakfast: breakfast,
    Lunch: lunch,
    Dinner: dinner,
    Snack: snack,
    Dessert: dessert,
    MainMeals: {
      list: dailyMainMenuList,
      ingredients: weekly_full_ingredients,
    },
    OtherMeals: { list: [], ingredients: [] },
  };

  return (
    <FoodContext.Provider value={contexValue}>
      {contexValue.Breakfast && <Fragment>{props.children}</Fragment>}
      {!contexValue.Breakfast && <h1>...Loading</h1>}
    </FoodContext.Provider>
  );
};

export default FoodContext;
