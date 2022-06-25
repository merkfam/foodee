import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const delete_ingredient = async (req, res) => {
  console.log("ENTERING DELETE DISH");
  let data = req.body;
  console.log("data", data);

  const _id = data._id;
  const price = data.price;
  const name = data.name;

  if (req.method === "POST") {
    // console.log("method POST true");
    // console.log("Entering delete_dish now.");
    // Get From Mongo User DataBase
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
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
            return console.log("There was an error deleting dish.");
          }
          let path = `_id`;
          path = path.toString();

          let path2 = `ingredients`;
          path2 = path2.toString();

          // let path3 = `ingredients.ingredient.name`
          const listId = data.listId;
          const ingredientCollection = client
            .db("food-planner")
            .collection("ingredients");
          console.log("Going to delete ingredient now...");
          ingredientCollection
            .updateOne(
              { [path]: ObjectId(listId) },
              { $pull: { ingredients: { _id: ObjectId(_id) } } }
            )
            .then(async (response) => {
              console.log("response,", response);
              res.status(200);
              res.send(response);
              console.log("done deleting the ingredient");
            });
          // .updateOne({ [path]: name }, { $pull: { [path2]: ObjectId(_id) } })
          // .then(async (response) => {
          //   console.log("response", response);
          //   res.status(200);
          //   res.send(response);
          //   console.log("done deleting the ingredient");
          // });
        });
      });
    } catch (err) {
      console.log("Error: Deleting Weekly Schedule Data Failed.");
      console.log(err);
    }
    console.log("leaving DELETE INGREDIENT now...");
    // p.resolve()
  }
};

export default delete_ingredient;
