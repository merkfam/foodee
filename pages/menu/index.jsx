// import { MongoClient, ObjectId } from "mongodb";
import FullMenu from "../../oComponents/Home/FullMenu/FullMenu";
import FoodContext from "../../store/food-context";
import { useContext } from "react";

const Menu = (props) => {
  const foodCtx = useContext(FoodContext);
  const full_menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];

  // console.log(full_menu.Snack, full_menu.Dessert);

  const showMeals = false;
  const showMealType = true;

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

  return <FullMenu meals={full_menu} mealModuleClasses={mealModuleClasses} />;
};

export default Menu;

// export const getStaticProps = async () => {
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
//   };
// };

// import { connectToDatabase } from "../util/mongodb";

// export default function Movies({ movies }) {
//   return (
//     <div>
//       <h1>Top 20 Movies of All Time</h1>
//       <p>
//         <small>(According to Metacritic)</small>
//       </p>
//       <ul>
//         {movies.map((movie) => (
//           <li>
//             <h2>{movie.title}</h2>
//             <h3>{movie.metacritic}</h3>
//             <p>{movie.plot}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();

//   const movies = await db
//     .collection("movies")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(20)
//     .toArray();

//   return {
//     props: {
//       movies: JSON.parse(JSON.stringify(movies)),
//     },
//   };
// }

// import { connectToDatabase } from "../util/mongodb";

// export default function Top({ movies }) {
//   return (
//     <div>
//       <h1>Top 1000 Movies of All Time</h1>
//       <p>
//         <small>(According to Metacritic)</small>
//       </p>
//       <ul>
//         {movies.map((movie) => (
//           <li>
//             <h2>{movie.title}</h2>
//             <h3>{movie.metacritic}</h3>
//             <p>{movie.plot}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const { db } = await connectToDatabase();

//   const movies = await db
//     .collection("movies")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(1000)
//     .toArray();

//   return {
//     props: {
//       movies: JSON.parse(JSON.stringify(movies)),
//     },
//   };
// }
