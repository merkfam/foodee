import create from "zustand";
import startingMenu from "./StartingMenu.json";
console.log("In Store");
console.log(startingMenu);
console.log("Exiting Store");
const useStore = create((set) => ({
  menu: startingMenu,
  dish: { Meal: "", Dish: "", Instructions: "" },
  isFull: false,
  ingredients: [],
  addIngedient: function (newIngredient) {
    set(this.ingedients.push(newIngredient));
  },
  removeAllIngredients: function () {
    set((this.ingredients = []));
  },

  updateDish: function (currentState) {
    return set((this.dish = currentState));
  },
  addMenu: function (currentDish, currentStateMeal) {
    return set(this.menu[currentStateMeal].push(currentDish));
  },
}));

export default useStore;
