import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const add_ingredient = async (req, res) => {
  // console.log("ENTERING UPDATE_INGREDIENT SCHEDULE");
  let data = req.body;
  // console.log("data", data);
  const ingredient = data.name;
  const price = Number(data.price);
  const listId = data.listId;

  // console.log("name", ingredient);
  // console.log("price", price);
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

          let documentPath = `ingredients.$`;
          documentPath = documentPath.toString();

          const update = {
            _id: new ObjectId(Math.random() + Math.random() / Math.random()),
            ingredient: {
              price: price,
              name: ingredient,
            },
          };
          // console.log("documentPath,", documentPath);

          const updateDoc = {
            $push: {
              [documentPath]: { ...update },
            },
          };

          const updateDoc2 = {
            $push: {
              ...update,
            },
          };

          const easy_path = "ingredients";
          const menuCollection = client
            .db("food-planner")
            .collection("ingredients");
          // console.log("Going to add now...");
          menuCollection
            .updateOne(
              { _id: ObjectId(listId) },
              {
                $push: {
                  [easy_path]: { ...update },
                },
              }
            )
            .then(async (response) => {
              res.status(200);
              res.send(response);
            });
        });
      });
    } catch (err) {
      console.log("Error: Updating Ingredient Data Failed.");
      console.log(err);
    }
    // console.log("leaving UPDATE_INGREDIENT now...");
  }
};

export default add_ingredient;
