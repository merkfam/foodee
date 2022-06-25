import { createContext } from "react";

const NavigationContext = createContext({
  linkify: () => {},
  landing: "Peter's Shop",
  home: "",
  homeLink: "",
  allMeals: "",
  allMealsLink: "",
  breakfast: "",
  breakfastLink: "",
  lunch: "",
  lunchLink: "",
  dinner: "",
  dinnerLink: "",
  ingredients: "",
  ingredientsLink: "",
  dropDown: "",
  add: "",
});
const linkify = function (text, directory) {
  if (!directory) {
    directory = "";
  }
  let final = "";
  for (let i = 0; i < text.length; i++) {
    if (i === 0) {
      final += text[i].toLowerCase();
    } else {
      if (text[i] === text[i].toUpperCase()) {
        const newChar = text[i].toLowerCase();
        final += `-${newChar}`;
      } else {
        final += text[i];
      }
    }
  }
  return `/${directory}${final}`;
};

export const NavigationContextProvider = (props) => {
  const directory = "menu/";
  const landing = "MerK Home";
  const home = "Home";
  const homeLink = linkify(home);
  const menu = "Menu";
  const menuLink = linkify(menu);
  const breakfast = "Breakfast";
  const breakfastLink = linkify(breakfast, directory);
  const lunch = "Lunch";
  const lunchLink = linkify(lunch, directory);
  const dinner = "Dinner";
  const dinnerLink = linkify(dinner, directory);
  const ingredients = "Ingredients";
  const ingredientsLink = linkify(ingredients);
  const dropDown = "Account";
  const add = "Add";
  const addLink = linkify(add);

  const contexValue = {
    landing: landing,
    home: home,
    homeLink: homeLink,
    menu: menu,
    menuLink: menuLink,
    breakfast: breakfast,
    breakfastLink: breakfastLink,
    lunch: lunch,
    lunchLink: lunchLink,
    dinner: dinner,
    dinnerLink: dinnerLink,
    ingredients: ingredients,
    ingredientsLink: ingredientsLink,
    add: add,
    addLink: addLink,
    dropDown: dropDown,
  };

  return (
    <NavigationContext.Provider value={contexValue}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
