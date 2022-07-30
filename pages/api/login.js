import { MongoClient, ServerApiVersion } from "mongodb";
import { save_error, save_log } from "../../Helpers/save_err_logs_to_db";

const handleLogin = async (req, res) => {
  const api = "/api/login";
  save_log(api, "Top", "Entering handleLogin");
  let data = req.body;

  console.log("LOGIN DATA: ", data);

  if (req.method === "POST") {
    try {
      const uri = process.env.FOODIE_URI;
      const db = process.env.FOODIE_MONGO_DB_NAME;
      const cl = process.env.FOODIE_MONGO_USERS;

      // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
      // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

      const filter = { "profile.localId": data.localId };
      const update = {
        expiresIn: data.expiresIn,
        token: data.idToken,
      };

      const return_type = process.env.RETURN_TYPE;

      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      return new Promise(async (resolve, reject) => {
        client.connect(async (err) => {
          if (err) {
            save_error(api, "MONGO client.connect(err)", err);
            console.log(`There was an error in ${REST_TYPE}.`);
            console.log(err);
            return err;
          }
          const collection = client.db(db).collection(cl);

          await collection
            .findOne({ ...filter })
            .then(async (response) => {
              const send_back_data = { ...response, ...update };
              console.log("RESPONSE: ", send_back_data.profile);
              res.send(send_back_data);
              resolve();
            })
            .catch(async (error) => {
              save_error("MONGO .findOne.then.catch", api, err);
              res.json(error);
              res.status(405).end();
              resolve();
            });
        });
        client.close();
      });
    } catch (err) {
      save_error("Bottom Catch", api, err);
      console.log(message);
      res.send(err);
    }
  }
};
export default handleLogin;

// await MONGO_PROMISE_WRAP(
//   uri,
//   db,
//   cl,
//   filter,
//   update,
//   "LOGIN_USER",
//   res,
//   return_type
// );
