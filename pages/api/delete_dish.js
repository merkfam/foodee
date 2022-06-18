import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const update_weekly_schedule = async (req, res) => {
  console.log("ENTERING DELETE DISH");
  let data = req.body;
  console.log("data", data);

  const _id = data._id;
  // console.log("_id", "|", _id);
  const dishType = data.dishType + "s";
  // console.log("dishType", "|", dishType);
  const meal = data.meal;
  // console.log("meal", "|", meal);
  const menuId = data.menuId;
  // console.log("menuId,", menuId);
  const name = data.name;
  // console.log("name,", name);

  //   console.log("data", data);

  if (req.method === "POST") {
    console.log("method POST true");
    console.log("Entering delete_dish now.");
    // Get From Mongo User DataBase
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      console.log("trying...");
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      const promise = await new Promise(async (resolve, reject) => {
        console.log("in promise block");
        client.connect(async (err) => {
          if (err) {
            console.log(err);
            return console.log("There was an error deleting dish.");
          }
          let path = `${meal}.${dishType}.dish`;
          path = path.toString();

          let path2 = `${meal}.${dishType}`;
          path2 = path2.toString();

          console.log("path", ":", path);

          const menuCollection = client
            .db("food-planner")
            .collection("full-menu");
          console.log("Going to delete now...");
          menuCollection
            .updateOne({ [path]: name }, { $pull: { [path2]: { dish: name } } })
            .then(async (response) => {
              console.log("response", response);
              res.status(200);
              res.send(response);
              console.log("done replacing");
            });
        });
      });
    } catch (err) {
      console.log("Error: Deleting Weekly Schedule Data Failed.");
      console.log(err);
    }
    console.log("leaving DELETE DISH now...");
    // p.resolve()
  }
};

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

export default update_weekly_schedule;
