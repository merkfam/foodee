import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const handleTransferSignup = async (req, res) => {
  // console.log("HANDLE TRANSFER SIGNUP");
  let data = req.body;
  const transferData = data.transferData;
  const signInData = data.signInData;

  // console.log("SIGNINDATA: ", signInData);
  // console.log("TRANSFER DATA: ", transferData);

  if (req.method === "POST") {
    try {
      if (err) {
        return console.log("There was an error posting to database.");
      }
    } catch {
      console.log("No Errors Receiving Data.");
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const endpoint = process.env.MerK_AUTH_API;
    // console.log("ENDPOINT: ", endpoint);

    const options = {
      method: "POST",
      body: JSON.stringify({
        displayName:
          signInData.displayName === ""
            ? signInData.fName
            : signInData.displayName,
        email: signInData.email,
        password: signInData.password,
        returnSecureToken: true,
      }),
    };

    // actual fetch request to firebase Auth.
    const response = await fetch(endpoint, options, headers).then((data) => {
      return data;
    });

    // console.log("FIRE BASE RESPONSE: ", response);

    const body = await response.json();

    // console.log("BODY: ", body);

    const userInfo = {
      // ...foodInfo, profile: body
      ...transferData,
      profile: { ...signInData },
    };
    if (body.error) {
      return res.send(body);
    }

    const uri = process.env.MerK_MONGO_URI;
    const db = "food-planner";
    const cl = FOODIE_MONGO_USERS;

    // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
    // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

    // Profile instead of Filter adds the additional information needed for signup in this special case
    const filter = {};
    const _id = ObjectId((Math.random * 1000) / Math.random());

    const profile = {
      "User Data": {
        "User Name": body.displayName,
        "First Name": data.fName,
        "Last Name": data.lName,
        "Main Meals": "7",
        "Optional Meals": "3",
        Currency: "฿",
        Email: body.email,
      },
      "Personal Data": {
        address: "",
        sex: "",
        gender: "",
      },

      "Regional Information": {
        country: "TH",
        currency: "฿",
      },
      "Theme Options": {
        theme: "",
      },
    };

    const update = {
      localId: body.localId,
      displayName: body.displayName,
      email: body.email,
      ...userInfo,
    };

    const return_type = process.env.RETURN_TYPE;
    const mongo_response = await MONGO_PROMISE_WRAP(
      uri,
      db,
      cl,
      filter,
      update,
      "SAVE_USER",
      res,
      return_type
    );

    console.log("SIGNUP RESPONSE: ", mongo_response);
    if (return_type === "return") {
      return res.send(mongo_response);
    }
  }
};
export default handleTransferSignup;
