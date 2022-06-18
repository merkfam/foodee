import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const update_weekly_schedule = async (req, res) => {
  // console.log("ENTERING UPDATE WEEKLY SCHEDULE");
  let data = req.body;
  // console.log("data", data);

  if (req.method === "POST") {
    // console.log("method POST true");
    // console.log("Entering get_weekly_schedule now.");
    // Get From Mongo User DataBase
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      //   const uri = process.env.MerK_MONGO_URI;
      // console.log("trying...");
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
            _id: data.previousId,
            meals: data.newSchedule.schedule.meals,
            ingredients: data.newSchedule.schedule.ingredients,
          };
          let _id = data.previousId;
          if (_id === "undefined" || _id === "") {
            _id = ObjectId(Math.random() * 500);
          }
          // console.log("update", update);
          // console.log("update_weekly_schedule");
          // console.log("data");
          // console.log(data);

          const menuCollection = client
            .db("food-planner")
            .collection("full-menu");
          // console.log("Going to replace now...");
          menuCollection
            .findOneAndReplace(
              { _id: ObjectId(_id) },
              {
                meals: data.newSchedule.schedule.meals,
                ingredients: data.newSchedule.schedule.ingredients,
              },
              { upsert: true }
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
      console.log("Error: Retreiving Weekly Schedule Data Failed.");
      console.log(err);
      res.send(err);
      return;
    }
    // console.log("leaving GET_WEEKLY_SCHEDULE now...");
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
