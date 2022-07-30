import { createContext } from "react";
const FoodContext = createContext({
  menuId: "",
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  dessert: [],
  weeklySchedule: {},
  currentMeal: "",
  mainMeals: {
    list: [],
    ingredients: [],
  },
  otherMeals: {
    list: [],
    ingredients: [],
  },
  scheduleId: "",
  allIngredients: [],
  currency: "",
  hasScheduleIngredients: Boolean,
  addNewDish: () => {},
  setBreakfast: () => {},
  setLunch: () => {},
  setDinner: () => {},
  setSnack: () => {},
  setDessert: () => {},
  getNew: () => {},
  reload: () => {},
  setReload: () => {},
  deleteDish: () => {},
  updateDish: () => {},
  updateIngredient: () => {},
  deleteIngredient: () => {},
  addNewIngredient: () => {},
});

export default FoodContext;
