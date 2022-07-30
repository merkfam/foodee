import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";
import { MongoClient, ServerApiVersion } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(process.env.FOODIE_URI, {
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
          .db(process.env.FOODIE_MONGO_DB_NAME)
          .collection(process.env.FOODIE_MONGO_USERS);
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
