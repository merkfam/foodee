import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const delete_ingredient_handler = async (req, res) => {
  let data = req.body;
  const _id = data._id;
  const userId = data.userId;

  const filter_path = `ingredients._id`;
  const filter = { _id: ObjectId(userId), [filter_path]: ObjectId(_id) };
  const update = { $pull: { ingredients: { _id: ObjectId(_id) } } };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = process.env.FOODIE_MONGO_USERS;
  const return_type = process.env.RETURN_TYPE;

  if (req.method === "POST") {
    const response = await MONGO_PROMISE_WRAP(
      uri,
      db,
      cl,
      filter,
      update,
      "DELETE",
      res,
      return_type
    );
    console.log("DELETE_INGREDIENT RESPONSE: ", response);
    if (return_type === "return") {
      return res.send(response);
    }
  }
};

export default delete_ingredient_handler;
