import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const add_ingredient = async (req, res) => {
  const data = req.body;
  const selectedData = data.selectedData;
  const userId = data.userId;
  console.log(
    "===============================ENTERING GET INGREDIENTS================================"
  );
  console.log("USER ID: ", userId);

  const filter_path = `${selectedData}`;
  const filter = { _id: Object(userId) };
  const update = {};
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
      "UPDATE_ALL",
      res,
      return_type
    );
    console.log("GET_INGREDIENT_LIST RESPONSE: ", response);
    if (return_type === "return") {
      return res.send(response);
    }
  }
};

export default add_ingredient;
