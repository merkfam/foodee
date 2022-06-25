import { MongoClient, ServerApiVersion } from "mongodb";
import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Get From Mongo User DataBase
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      //   const uri = process.env.MerK_MONGO_URI;
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      const promise = await new Promise(async (resolve, reject) => {
        client.connect(async (err) => {
          if (err) {
            return console.log(
              "There was an error adding the new dish, try again."
            );
          }

          const menuCollection = client
            .db("food-planner")
            .collection("full-menu");

          menuCollection.find({}).toArray(async (err, results) => {
            // console.log("results below:");
            // console.log(results);
            if (err) {
              return res.send(err);
            }
            const result = results[0];
            // console.log("result below:");
            // console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "max-age=180000");
            res.send(result);
            // console.log(resolve());
            client.close();
            return result;
          });
        });
      });
      // console.log("data then more");
    } catch (err) {
      console.log("Error: Retreiving FULL MENU Data Failed.");
      console.log(err);
    }
    // console.log("leaving GET_FULL_MENU now...");
    // p.resolve()
  }
};
// .then(
//   (response) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Cache-Control", "max-age=180000");
//     res.send({ response });
//     resolve();
//   },
//   (err) => {
//     console.log("The error in login wil be shown below:");
//     console.log(err);
//     return res.send(err);
//   }
// )
// .catch((err) => {
//   // console.log("an error occured at line 217");
//   console.log(err);
// });

// const result = menuCollection.find({});
// console.log(result);

// const final = await result.json();
// console.log("final");
// console.log(final);
// res.statusCode = 200;
// res.setHeader("Content-Type", "application/json");
// res.setHeader("Cache-Control", "max-age=180000");
// return res.send(result);

// .then((result) => {
//   const data = result.toArray();
//   console.log(data);
//   console.log("result is");
//   console.log(result);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("Cache-Control", "max-age=180000");
//   console.log(result);
//   return res.send(result);
// });

//   const client = await MongoClient.connect(
//     "mongodb+srv://MerK_Admin:Lithiumx1!@cluster0.vqzf4.mongodb.net/?retryWrites=true&w=majority"
//   );
//   const db = client.db("food-planner");
//   const menuCollection = db.collection("full-menu");
//   const meals = await menuCollection.find().toArray();
//   console.log("Meals Below:")
//   console.log(meals)

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
//   res.status(200)
//   res.send(full_menu)
//   resolve

export default handler;
