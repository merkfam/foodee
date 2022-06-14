import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

// db.students.updateOne(
//   { _id: 4, "grades.grade": 85 },
//   { $set: { "grades.$.std" : 6 } }
// )
// import { connectToDatabase } from "../../util/mongodb";

// export default async (req, res) => {
//   const { db } = await connectToDatabase();

//   const movies = await db
//     .collection("movies")
//     .find({})
//     .sort({ metacritic: -1 })
//     .limit(20)
//     .toArray();

//   res.json(movies);
// };

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data);
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      const some = new Promise((resolve, reject) => {
        client.connect(async (err) => {
          const menuCollection = client
            .db("food-planner")
            .collection("full-menu");

          if (err) {
            return console.log(
              "There was an error adding the new dish, try again."
            );
          }
          const mealType = data.Meal;
          const dishType = data.DishType;

          // path is : "Breakfast.Entrees"

          const path = `${mealType}.${dishType}`;
          const path2 = `${mealType}.Meal`;
          console.log("path below");
          console.log(path);
          console.log("path2 below:");
          console.log([path2]);
          const instructions = data.Data.Instructions;
          const ingredients = data.Data.Ingredients;
          const dishName = data.Data.Dish;
          const newIngredients = ingredients.map((ingredient) => {
            return {
              _id: ObjectId(Math.random() * Math.random()),
              ...ingredient,
            };
          });
          const dish = data.Data.DishType;
          const sendData = {
            _id: ObjectId(
              Math.random() * (Math.random() + Math.random()) * Math.random()
            ),
            Dish: dishName,
            Ingredients: newIngredients,
            Instructions: {
              _id: ObjectId(
                Math.random() + Math.random() * Math.random() + Math.random()
              ),
              Instructions: instructions,
            },
          };

          console.log("send data below:");
          console.log(sendData);

          // const filter = { _id: ObjectId("62a5715d7ec7c156a41e024a") };
          const filter2 = { [path2]: mealType };
          console.log("filter1 below:");
          console.log(filter2);

          const updateDoc = {
            $push: {
              [path]: {
                _id: new ObjectId(
                  Math.random() * Math.random() + Math.random()
                ),
                ...sendData,
              },
            },
          };

          const result = await menuCollection.updateOne(filter2, updateDoc);

          console.log("api result below:");
          console.log(result);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "max-age=180000");
          client.close();
          const final = JSON.stringify(result);
          console.log(final);
          res.send(final);
          resolve();
        });
      });
    } catch {
      console.log("error found while searching database");
    }
  }
};

// .then((result) => {
//   console.log("api collection result below:");
//   console.log(result);
// });

export default handler;

// import { MongoClient, ServerApiVersion } from "mongodb";

// const handler = async (req, res) => {
//   // Get From Mongo User DataBase
//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const uri = process.env.MerK_MONGO_URI;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
//   return new Promise((resolve, reject) => {
//     client.connect((err) => {
//       const usersCollection = client.db("food-planner").collection("full-menu");
//       if (err) {
//         // console.log("error connecting to database");
//         return err;
//       }

//       usersCollection
//         .findOne({
//           localId: body.localId,
//         })
//         .then(
//           (response) => {
//             // console.log("response");
//             // console.log(response);
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.setHeader("Cache-Control", "max-age=180000");
//             res.send({ ...response, ...data, ...body });
//             resolve();
//           },
//           (err) => {
//             console.log("The error in login wil be shown below:");
//             console.log(err);
//             return res.send(err);
//           }
//         )
//         .catch((err) => {
//           // console.log("an error occured at line 217");
//           console.log(err);
//         });
//     });
//   });
// };

// export default handler;
