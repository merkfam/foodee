import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      // console.log(data);
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
          const mealType = data.meal.trim();
          // console.log(mealType);
          const dishType = data.dishType;

          // path is : "Breakfast.Entrees"

          const instructions = data.data.instructions;
          const ingredients = data.data.ingredients;
          const dishName = data.data.dish;
          const newIngredients = ingredients.map((ingredient) => {
            return {
              _id: ObjectId(Math.random() * Math.random()),
              ...ingredient,
            };
          });
          const dish = data.data.dishType;
          const sendData = {
            _id: new ObjectId(
              Math.random() * (Math.random() + Math.random()) * Math.random()
            ),
            dish: dishName,
            ingredients: newIngredients,
            instructions: {
              _id: ObjectId(
                Math.random() + Math.random() * Math.random() + Math.random()
              ),
              instructions: instructions,
            },
          };

          // console.log("send data below:");
          // console.log(sendData);

          //  mealType = breakfast | dishType = entrees
          const path = `${mealType}.${dishType}`;
          const path2 = `${mealType}.meal`;

          // console.log("path below");
          // console.log(path);
          // console.log("path2 below:");
          // console.log([path2]);

          // const filter = { _id: ObjectId("62a5715d7ec7c156a41e024a") };
          const filter2 = { [path2]: mealType };
          // console.log("filter2 below:");
          // console.log(filter2);

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

          // console.log("api result below:");
          // console.log(result);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "max-age=180000");
          client.close();
          const final = JSON.stringify(result);
          // console.log(final);
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
