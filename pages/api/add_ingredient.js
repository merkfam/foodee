import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const add_ingredient = async (req, res) => {
  let data = req.body;
  const ingredient = data.name;
  const price = Number(data.price);
  const userId = data.userId;
  const newId = new ObjectId(Math.random() + Math.random() / Math.random());
  const _id = newId.toString();

  const update_data = {
    _id: _id,
    ingredient: {
      price: price,
      name: ingredient,
    },
  };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;

  // Specifying return in return_type, gives the variable a value, otherwise the response
  // is automatically sent to the client

  const return_type = process.env.RETURN_TYPE;
  if (req.method === "POST") {
    const test_update_path = "ingredients";
    const test_cl = process.env.FOODIE_MONGO_USERS;
    const test_filter = { _id: ObjectId(userId) };
    const test_update = { $push: { [test_update_path]: { ...update_data } } };

    const response = await MONGO_PROMISE_WRAP(
      uri,
      db,
      test_cl,
      test_filter,
      test_update,
      "ADD",
      res,
      return_type
    );

    // console.log("_______ADD_INGREDIENT_RESPONSE________- ", response);
    if (return_type === "return") {
      res.send(response);
    }
  }
};

export default add_ingredient;
