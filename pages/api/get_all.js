import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { ObjectId } from "mongodb";

const update_all = async (req, res) => {
  console.log("Entering UPDATE ALL");
  let data = req.body;
  const userId = ObjectId(data);

  if (req.method === "POST") {
    try {
      if (err) {
        return console.log("There was an error posting to database.");
      }
    } catch (err) {
      console.log("No Errors Receiving Data.");
    }

    const uri = process.env.FOODIE_URI;
    const db = process.env.FOODIE_MONGO_DB_NAME;
    const cl = process.env.FOODIE_MONGO_USERS;

    // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
    // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

    const filter = { _id: ObjectId(userId) };
    const update = {};
    const return_type = process.env.RETURN_TYPE;

    console.log("data,", data);
    await MONGO_PROMISE_WRAP(
      uri,
      db,
      cl,
      filter,
      update,
      "UPDATE_ALL",
      res,
      return_type
    );
    console.log("UPDATE ALL RESPONSE: ", response);
    if (return_type === "return") {
      return res.send(response);
    }
  }
};
export default update_all;
