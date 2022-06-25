import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const update_ingredient = async (req, res) => {
  // console.log("ENTERING UPDATE_INGREDIENT SCHEDULE");
  let data = req.body;
  let _id = data._id;
  const name = data.name;
  const price = data.price;
  const listId = data.list_id;
  if (_id === "undefined") {
    _id = ObjectId(Math.random() + Math.random() / Math.random());
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

          const menuCollection = client
            .db("food-planner")
            .collection("ingredients");
          console.log("Going to update ingredient now...");
          menuCollection
            .updateOne(
              { "ingredients._id": ObjectId(_id) },
              {
                $set: {
                  "ingredients.$.ingredient": { name: name, price: price },
                },
              }
            )

            .then(async (response) => {
              // console.log("update response,", response);
              res.status(200);
              res.send(response);
            });
        });
      });
    } catch (err) {
      console.log("Error: Updating Ingredient Data Failed.");
      console.log(err);
    }
    console.log("leaving UPDATE_INGREDIENT now...");
  }
};

export default update_ingredient;
