// import { useState } from "react";

const FilterIngredients = (all_Ingredients) => {
  const data = {};
  let info = {};
  const final = Object.keys(
    all_Ingredients.reduce((obj, ingredient) => {
      if (!obj[ingredient.ingredient]) {
        obj[ingredient.ingredient] = {
          price: ingredient.Price,
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
  // console.log("final below");
  // console.log(final);

  return final;
};

export default FilterIngredients;
