import { MongoClient, ServerApiVersion } from "mongodb";

const handleSignup = async (req, res) => {
  //   handle signup basically uses firebase auth for strong security and then while still in server uses
  //   that data retrieved from server and creates an account data object using mongo atlas
  //   login uses the same methodology except it uses email and password to authenticate the user
  //   with firebase and then information is retrieved from mongo Atlas
  const addDB = async (enteredData) => {
    const uri = process.env.MerK_MONGO_URI;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    const fixedData = {
      localId: enteredData.localId,
      displayName: enteredData.displayName,
    };

    // Logic
    client.connect(async (err) => {
      const usersCollection = client.db("sors").collection("usersDB");
      if (err) {
        console.log("error connecting to database");
        return err;
      }

      const result = await usersCollection.insertOne(fixedData);
      // console.log("signup result below:");

      client.close();
      return result;
    });
  };

  if (req.method === "POST") {
    try {
      if (err) {
        return console.log("There was an error posting to database.");
      }
    } catch {
      console.log("No Errors Receiving Data.");
    }

    // console.log("in signup");

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    // Data sent in POST request
    let data = req.body;
    // console.log("signup data below:");

    // create new user
    // console.log("trying to create a new user now...");
    const endpoint = process.env.SORS_FIREBASE_SIGNUP_URI;

    const options = {
      method: "POST",
      body: JSON.stringify({
        // if user leaves display name empty then default to first name
        displayName: data.displayName === "" ? data.fName : data.displayName,
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
    };

    // actual fetch request to firebase Auth.
    const response = await fetch(endpoint, options, headers).then((data) => {
      return data;
    });
    const body = await response.json();

    if (body.error) {
      return res.send(body);
    }
    //  Was Using a delay but ended up finding a better way to work with promises...
    //  basically using .then() chains until data is able to be packaged and shipped out ...
    //  and trial and error haha
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function main() {
      // Add To Mongo User DataBase
      const addUserData = await addDB(body);
      return addUserData;
    }

    const last = await main();
    // Contains data needed for processing login endpoint
    res.send(body);
  }
};
export default handleSignup;
