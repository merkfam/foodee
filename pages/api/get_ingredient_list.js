import { MongoClient, ServerApiVersion } from "mongodb";
// import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const handler = async (req, res) => {
  // console.log("ENTERING GET_WEEKLY_SCHEDULE");
  if (req.method === "POST") {
    // Get From Mongo User DataBase
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      //   const uri = process.env.MerK_MONGO_URI;
      const uri = process.env.MerK_MONGO_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });

      const promise = await new Promise(async (resolve, reject) => {
        client.connect(async (err) => {
          if (err) {
            return console.log(
              "There was an error getting the saved weekly schedule."
            );
          }

          const menuCollection = client
            .db("food-planner")
            .collection("ingredients");

          menuCollection.find({}).toArray(async (err, results) => {
            // console.log("results below:");
            // console.log(results);

            if (err) {
              return res.send(err);
            }
            const result = results.length === 0 ? [] : results[0];
            if (result === "undefined") {
              console.log("result,", result);
              res.statusCode = 500;
              res.send({ err: "NO_SCHEDULE" });
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "max-age=180000");
            res.send(result);

            client.close();
            return result;
          });
        });
      });
    } catch (err) {
      console.log("Error: Updating Weekly Schedule Data Failed.");
      console.log(err);
    }
    console.log("leaving GET_WEEKLY_SCHEDULE now...");
    // p.resolve()
  }
};

export default handler;
