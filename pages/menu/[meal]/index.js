import { useRouter } from "next/router";
import Meal from "../../../oComponents/Home/MealList/Meal/Meal";
import FoodContext from "../../../store/food-context";
import { useContext } from "react";

const MealPage = (props) => {
  const router = useRouter();
  let currentMeal = router.query.meal;
  const foodCtx = useContext(FoodContext);
  const menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];

  const meal = router.query.meal;

  let final;
  menu.forEach((mealData) => {
    if (mealData.meal === meal) {
      final = mealData;
      return;
    }
  });

  const showMeals = true;
  const showMealType = true;
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

  const deleteDish = foodCtx.deleteDish;

  const setCurrentMeal = foodCtx.setCurrentMeal;

  return (
    <Meal
      setCurrentMeal={setCurrentMeal}
      entrees={final && typeof final.entrees === "object" && final.entrees}
      sides={final && typeof final.sides === "object" && final.sides}
      key={Math.random()}
      meal={final && final.meal ? final.meal : currentMeal}
      mealModuleClasses={mealModuleClasses}
      deleteDish={deleteDish}
    />
  );
};

export default MealPage;

// export const getStaticPaths = async () => {
//   const client = await MongoClient.connect(
//     process.env.MerK_MONGO_URI
//   );
//   const db = client.db("food-planner");
//   const menuCollection = db.collection("full-menu");
//   const meals = await menuCollection.find().toArray();
//   const final = meals[0];
//   const data = final.Breakfast;

//   client.close();
//   return {
//     fallback: "blocking",
//     paths: meals.map((meal) => ({
//       params: { meal: meal._id.toString() },
//     })),
//   };
// };

// export const getStaticProps = async (context) => {
//   // Get Data For Single Page
//   const meal = context.params.meal;

//   const formatMeal = TitleFy(meal);

//   const client = await MongoClient.connect(
//     process.env.MerK_MONGO_URI
//   );

//   const query = `${formatMeal}.Meal`;
//   const db = client.db("food-planner");
//   const menuCollection = db.collection("full-menu");

//   const meals = await menuCollection.find().toArray();
//   const final = meals[0][formatMeal];

//   const Entrees = final.Entrees.map((entree) => {
//     const Instructions = ObjectId(entree.Instructions._id).toString();
//     const Ingredients = entree.Ingredients.map((ingredient) => {
//       return { ...ingredient, _id: ObjectId(ingredient._id).toString() };
//     });

//     return {
//       ...entree,
//       Ingredients: Ingredients,
//       Instructions: Instructions,
//       _id: ObjectId(entree._id).toString(),
//     };
//   });

//   const Sides = final.Sides.map((side) => {
//     const Instructions = ObjectId(side.Instructions._id).toString();
//     const Ingredients = side.Ingredients.map((ingredient) => {
//       return { ...ingredient, _id: ObjectId(ingredient._id).toString() };
//     });

//     return {
//       ...side,
//       Ingredients: Ingredients,
//       Instructions: Instructions,
//       _id: ObjectId(side._id).toString(),
//     };
//   });

//   const sendData = {
//     ...final,
//     Sides: Sides,
//     Entrees: Entrees,
//     _id: ObjectId(final._id).toString(),
//   };

//   client.close();

//   return {
//     props: {
//       menu: {
//         meals: sendData,
//       },
//     },
//   };
// };
