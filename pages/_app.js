import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import AppWrapper from "../oComponents/UI/AppWrapper/AppWrapper";
import { StrictMode } from "react";
import { ThemeProvider, Container, SSRProvider } from "react-bootstrap";
import { AuthContextProvider } from "../store/auth-context";
import { BusinessContextProvider } from "../store/business-context";
import { WindowContextProvider } from "../store/window-context";
import { FoodContextProvider } from "../store/food-context";
// import { MongoClient, ObjectId } from "mongodb";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <SSRProvider>
        <BusinessContextProvider>
          <AuthContextProvider>
            <FoodContextProvider>
              <ThemeProvider
                breakpoints={["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
              >
                <Container className={"main"}>
                  <WindowContextProvider>
                    <AppWrapper>
                      <Component {...pageProps} />
                    </AppWrapper>
                  </WindowContextProvider>
                </Container>
              </ThemeProvider>
            </FoodContextProvider>
          </AuthContextProvider>
        </BusinessContextProvider>
      </SSRProvider>
    </StrictMode>
  );
}

export default MyApp;

// export const getServerSideProps = async (context) => {
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
