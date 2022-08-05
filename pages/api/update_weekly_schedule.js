// import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

// const update_weekly_schedule = async (req, res) => {
//   let data = req.body;
//   let schedule_id = data.newSchedule.schedule_id;
//   const userId = data.newSchedule.user_id;
//   const schedule = data.newSchedule.schedule;

//   const filter = {
//     _id: ObjectId(userId),
//     "weeklyList._id": ObjectId(schedule_id),
//   };
//   const update = {
//     $set: {
//       weeklyList: {
//         _id: ObjectId(schedule_id),
//         meals: schedule.meals,
//         ingredients: schedule.ingredients,
//       },
//     },
//   };

//   const uri = process.env.FOODIE_URI;
//   const db = process.env.FOODIE_MONGO_DB_NAME;
//   const cl = process.env.FOODIE_MONGO_USERS;
//   const return_type = process.env.RETURN_TYPE;

//   if (req.method === "POST") {
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverApi: ServerApiVersion.v1,
//     });

//     const response = await new Promise(async (resolve, reject) => {
//       client.connect(async (err) => {
//         if (err) {
//           console.log(err);
//           return console.log("There was an error updating schedule.");
//         }
//         const menuCollection = client.db(db).collection(cl);

//         menuCollection
//           .updateOne({ ...filter }, { ...update })
//           .then(async (response) => {
//             return res.send(response);
//           });
//       });
//       client.close();
//     });
//     if (return_type === "send") {
//       return res.send(response);
//     }
//     res.send(response);
//   }
// };

// export default update_weekly_schedule;

import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const update_weekly_schedule = async (req, res) => {
  let data = req.body.newSchedule;
  const userId = data.user_id;
  const scheduleId = data.schedule_id;
  const schedule = data.schedule;

  console.log("USER_ID: ", userId);
  console.log("SCHEDULE_ID: ", scheduleId);
  console.log("SCHEDULE: ", schedule);

  const filter = {
    "weeklyList._id": ObjectId(scheduleId),
  };
  const update = {
    $set: {
      weeklyList: {
        _id: ObjectId(scheduleId),
        meals: schedule.meals,
        ingredients: schedule.ingredients,
      },
    },
  };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = process.env.FOODIE_MONGO_USERS;
  const return_type = process.env.RETURN_TYPE;

  if (req.method === "POST") {
    const mongo_response = await MONGO_PROMISE_WRAP(
      uri,
      db,
      cl,
      filter,
      update,
      "UPDATE_ONE",
      res,
      return_type
    );
    if (return_type === "send") {
      return res.send(response);
    }
    res.send(response);
  }
};

export default update_weekly_schedule;
