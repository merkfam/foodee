export const GENERATE_SCHEDULE = (realMenuData, otherMenuData, save = true) => {
  if (realMenuData[0] === "" || otherMenuData[0] === "") {
    return;
  }

  // Need To check if returned data is null //
  const [dailyMainMenuList, fullIngredients] =
    realMenuData === null ||
    realMenuData === "undefined" ||
    realMenuData.length <= 0
      ? [null, null]
      : organizeMeals(realMenuData, 7);

  // Filters the ingredients to send only those that are used in the schedule and then
  // returns them with the number of times they are needed. //

  const weekly_full_ingredients =
    fullIngredients !== null ? FilterIngredients(fullIngredients) : {};

  const [dailyOtherList, otherIngredients] =
    otherMenuData === null ||
    otherMenuData === "undefined" ||
    otherMenuData.length <= 0
      ? [null, null]
      : organizeMeals(otherMenuData, 3);

  const weekly_other_ingredients =
    otherIngredients !== null && otherIngredients !== null
      ? FilterIngredients(otherIngredients)
      : {};

  return {
    meals: { main: dailyMainMenuList, other: dailyOtherList },
    ingredients: {
      main: weekly_full_ingredients,
      other: weekly_other_ingredients,
    },
  };
};

export const organizeMeals = (mealClassChoice, number) => {
  const dailyList = [];
  const allIngredients = [];

  for (let day = 0; day < number; day++) {
    const dayList = [];
    for (let i = 0; i < mealClassChoice.length; i++) {
      const meal = mealClassChoice[i];
      const entreeRand = Math.floor(Math.random() * meal.entrees.length);
      const sideRand = Math.floor(Math.random() * meal.sides.length);
      const entree = meal.entrees[entreeRand];
      const side = meal.sides[sideRand];
      dayList.push({ meal: meal.meal, entree: entree, side: side });
    }
    dailyList.push(dayList);
  }

  dailyList &&
    dailyList.forEach((day) => {
      day.forEach((meal) => {
        meal.entree &&
          meal.entree.ingredients.forEach((ingredient) => {
            if (ingredient === "undefined") {
              return;
            }
            allIngredients.push(ingredient);
          });
        meal.side &&
          meal.side.ingredients.forEach((ingredient) => {
            allIngredients.push(ingredient);
          });
      });
    });
  return [dailyList, allIngredients];
};

export const FilterIngredients = (all_Ingredients) => {
  const data = {};
  const final = Object.keys(
    all_Ingredients.reduce((obj, ingredient) => {
      if (!obj[ingredient.ingredient]) {
        obj[ingredient.ingredient] = {
          price: ingredient.price,
          number: 1,
          _id: ingredient._id,
          ingredient: ingredient.ingredient,
        };
      } else {
        obj[ingredient.ingredient].number++;
      }
      return obj;
    }, data)
  ).map((ingredient, index) => {
    return {
      id: data[ingredient]._id,
      list: index + 1,
      ingredient: data[ingredient].ingredient,
      price: data[ingredient].price,
      number: data[ingredient].number,
    };
  });

  return final;
};

export default FilterIngredients;
