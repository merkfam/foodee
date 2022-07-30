import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const update_dish = async (req, res) => {
  let data = req.body;
  const _id = ObjectId(data._id);
  const userId = ObjectId(data.id);
  const ingredients = data.ingredients;
  const instructions = data.instructions;
  const dish = data.dish;
  const meal = data.meal;
  const dishType = data.dishType;

  const update_doc = {
    _id: _id,
    dish: dish,
    ingredients: ingredients,
    instructions: instructions,
  };
  const filter_path = `fullMenu.${meal}.${dishType}s._id`;
  const update_path = `fullMenu.${meal}.${dishType}s.$`;

  const filter = { _id: userId, [filter_path]: _id };
  const update = { $set: { [update_path]: { ...update_doc } } };
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
      "UPDATE_ONE",
      res,
      return_type
    );
    if (return_type === "return") {
      return res.send(response);
    }
  }
};

export default update_dish;
