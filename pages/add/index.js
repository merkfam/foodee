import css from "./add.module.css";
import AddDishForm from "../../oComponents/AddDishForm/AddDishFormPage";
// import { MongoClient, ObjectId } from "mongodb";
import { useContext } from "react";
import FoodContext from "../../store/food-context";
// const menu = props.menu;
// const full_menu = [
//   menu.Breakfast,
//   menu.Lunch,
//   menu.Dinner,
//   menu.Snack,
//   menu.Dessert,
// ];

const AddNewDishPage = (props) => {
  const foodCtx = useContext(FoodContext);
  const menu = [
    foodCtx.Breakfast,
    foodCtx.Lunch,
    foodCtx.Dinner,
    foodCtx.Snack,
    foodCtx.Dessert,
  ];

  const dishes = [];

  menu.forEach((meal) => {
    dishes.push(meal.Meal);
  });
  dishes.unshift("Choose");

  return <AddDishForm dishes={dishes} />;
};

export default AddNewDishPage;

// export const getStaticProps = async () => {
//   // Get Data For Single Page
//   // const id = context.params.id;
//   const client = await MongoClient.connect(
//     "mongodb+srv://MerK_Admin:Lithiumx1!@cluster0.vqzf4.mongodb.net/?retryWrites=true&w=majority"
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
//   };
// };
