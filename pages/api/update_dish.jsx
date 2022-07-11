import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const update_dish = async (req, res) => {
  // console.log("ENTERING UPDATE DISH SCHEDULE");
  let data = req.body;
  // console.log("data", data);
  const _id2 = ObjectId(data._id);
  // const _id = data._id;
  // const menuId = data.menuId;
  const ingredients = data.ingredients;
  const instructions = data.instructions;
  const dish = data.dish;
  const meal = data.meal;
  const dishType = data.dishType;
  // console.log(ingredients);

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    if (!ingredient._id) {
      ingredient._id = ObjectId(
        new ObjectId(Math.random() + Math.random() * Math.random() * 6)
      ).toString();
    }
  }

  if (req.method === "POST") {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      const promise = await new Promise(async (resolve, reject) => {
        // console.log("in promise block");
        client.connect(async (err) => {
          if (err) {
            console.log(err);
            return console.log("There was an error updating schedule.");
          }

          const update = {
            _id: _id2,
            dish: dish,
            ingredients: ingredients,
            instructions: instructions,
          };
          //   meal=Breakfast, dishType=Entrees
          let filter = `${meal}.${dishType}s._id`;
          filter = filter.toString();

          let documentPath = `${meal}.${dishType}s.$`;
          documentPath = documentPath.toString();

          // console.log("documentPath,", documentPath);
          const menuCollection = client
            .db("food-planner")
            .collection("full-menu");
          // console.log("Going to replace now...");
          menuCollection
            .updateOne(
              { [filter]: _id2 },
              {
                $set: {
                  [documentPath]: { ...update },
                },
              }
            )

            .then(async (response) => {
              // console.log("response", response);
              res.status(200);
              res.send(response);
              // console.log("done replacing");
            });
        });
      });
    } catch (err) {
      console.log("Error: Retreiving Dish Schedule Data Failed.");
      console.log(err);
    }
    // console.log("leaving GET_DISH_SCHEDULE now...");
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

export default update_dish;
