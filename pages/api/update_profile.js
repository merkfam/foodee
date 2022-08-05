import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";

const update_profile_handler = async (req, res) => {
  let data = req.body;
  let profile_id = data._id;
  let userId = data.userId;

  const updateDoc = {
    ...data,
    _id: ObjectId(profile_id),
    userId: ObjectId(userId),
  };

  const filter = { _id: ObjectId(userId), "profile._id": ObjectId(profile_id) };
  const update = {
    $set: { profile: { ...updateDoc } },
  };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = process.env.FOODIE_MONGO_USERS;
  const return_type = process.env.RETURN_TYPE;

  if (req.method === "POST") {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    const response = await new Promise(async (resolve, reject) => {
      client.connect(async (err) => {
        if (err) {
          console.log(err);
          return console.log("There was an error updating schedule.");
        }

        const menuCollection = client.db(db).collection(cl);

        menuCollection
          .updateOne({ ...filter }, { ...update })
          .then(async (response) => {
            console.log("response: ", response);
            return res.send(response);
          });
      });

      client.close();
    });

    if (return_type === "send") {
      return res.send(response);
    }
    res.send(response);
  }
};

export default update_profile_handler;
