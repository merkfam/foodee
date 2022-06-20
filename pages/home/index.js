import css from "./home.module.css";
import ShoppingList from "../../oComponents/ShoppingList/ShoppingList";
import FoodContext from "../../store/food-context";
import { useContext, useEffect, useState } from "react";

const Home = (props) => {
  const foodCtx = useContext(FoodContext);

  const menuId = foodCtx.menuId;
  const scheduleId = foodCtx.scheduleId;
  const getNew = foodCtx.getNew;

  const otherDays = 3;
  const weeklyDays = 7;

  const showMeals = false;
  const showMealType = false;

  // Classes For Meal Module & Below
  const entreeClasses = {};
  const entreeListClasses = { entree: entreeClasses };
  const sideClasses = {};
  const sideListClasses = { side: sideClasses };

  const dishClass = {};
  const headersClasses = {};

  const mealModuleClasses = {
    entrees: entreeListClasses,
    sides: sideListClasses,
    dish: dishClass,
    headers: headersClasses,
    show: { meals: showMeals, mealType: showMealType },
  };

  const realMeals = foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.list;
  // console.log(realMeals);
  const realIngredients =
    foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.ingredients;
  const otherMeals = foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.list;
  const otherIngredients =
    foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.ingredients;

  const shoppingList = realIngredients &&
    otherIngredients && [...realIngredients, ...otherIngredients];

  return (
    <ShoppingList
      shoppingList={shoppingList}
      realMeals={realMeals}
      realIngredients={realIngredients}
      otherMeals={otherMeals}
      otherIngredients={otherIngredients}
      menuId={menuId}
      scheduleId={scheduleId}
      otherDays={otherDays}
      weeklyDays={weeklyDays}
      showMeals={showMeals}
      showMealType={showMealType}
      mealModuleClasses={mealModuleClasses}
      getNew={getNew}
      reload={foodCtx.reload}
      setReload={foodCtx.setReload}
      hasIngredients={foodCtx.hasScheduleIngredients}
    />
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const client = await MongoClient.connect(
//     process.env.MerK_MONGO_URI
//   );
//   const db = client.db("food-planner");
//   const menuCollection = db.collection("full-menu");
//   const meals = await menuCollection.find().toArray();

//   let final = meals[0];
//   client.close();

//   const keys = Object.keys(final);

//   const full_menu = keys.forEach((key) => {
//     let _id;
//     if (key === "_id") {
//       _id = ObjectId(final[key]._id).toString();
//     } else {
//       const Entrees = final[key].Entrees.map((entree) => {
//         const Instructions = ObjectId(entree.Instructions._id).toString();
//         const Ingredients = entree.Ingredients.map((ingredient) => {
//           return { ...ingredient, _id: ObjectId(ingredient._id).toString() };
//         });

//         return {
//           ...entree,
//           Ingredients: Ingredients,
//           Instructions: Instructions,
//           _id: ObjectId(entree._id).toString(),
//         };
//       });

//       const Sides = final[key].Sides.map((side) => {
//         const Instructions = ObjectId(side.Instructions._id).toString();
//         const Ingredients = side.Ingredients.map((ingredient) => {
//           return { ...ingredient, _id: ObjectId(ingredient._id).toString() };
//         });

//         return {
//           ...side,
//           Ingredients: Ingredients,
//           Instructions: Instructions,
//           _id: ObjectId(side._id).toString(),
//         };
//       });
//       final[key] = { Meal: final[key].Meal, Entrees: Entrees, Sides: Sides };
//     }
//   });

//   return {
//     props: {
//       menu: {
//         Breakfast: final.Breakfast,
//         Lunch: final.Lunch,
//         Dinner: final.Dinner,
//         Snack: final.Snack,
//         Dessert: final.Dessert,
//       },
//     },
//     // revalidate: 10,
//   };
// };
