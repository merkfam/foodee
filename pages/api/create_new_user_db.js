import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";
import { MongoClient, ServerApiVersion } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      client.connect(async (err) => {
        if (err) {
          return console.log(
            "There was an error adding the new dish, try again."
          );
        }

        const menuCollection = client
          .db("food-planner")
          .collection("full-menu");
        const result = await menuCollection.insertOne(EmptyMenu[0]);
        client.close();
        res.send(result);
      });
    } catch {
      console.log("Error: Adding the new user did not succeed.");
    }
  }
};

export default handler;
