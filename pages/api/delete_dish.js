import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { ObjectId } from "mongodb";

const delete_dish_handler = async (req, res) => {
  let data = req.body;
  const dishType = data.dishType + "s";
  const meal = data.meal;
  const dish = data.name;
  const _id = data._id;
  const userId = data.userId;

  const filter_path = `fullMenu.${meal}.${dishType}._id`;
  const update_path = `fullMenu.${meal}.${dishType}`;
  const filter = { _id: ObjectId(userId), [filter_path]: ObjectId(_id) };
  const update = { $pull: { [update_path]: { _id: ObjectId(_id) } } };

  // console.log("FILTER: ", filter);
  // console.log("UPDATE: ", update);

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
    console.log("DELETE_DISH_RESPONSE: ", response);
    if (return_type === "return") {
      return res.send(response);
    }
  }
  res.send();
};

export default delete_dish_handler;
