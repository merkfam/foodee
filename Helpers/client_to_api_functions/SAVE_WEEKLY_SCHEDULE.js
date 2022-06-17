const SAVE_WEEKLY_SCHEDULE = async (data) => {
  const enteredData = JSON.stringify(data);
  try {
    const final = await fetch("/api/save_schedule", {
      method: "POST",
      body: enteredData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("finished with saving weekly menu");
    console.log(final);
  } catch (err) {
    console.log("Error: Saving Weekly Schedule Failed in Fetch.");
    console.log(err);
    return err;
  }
};

export default SAVE_WEEKLY_SCHEDULE;
// const promise = await new Promise(async (resolve, reject) => {
//   client.connect(async (err) => {
//     if (err) {
//       return console.log("There was an error adding the new dish, try again.");
//     }

//     menuCollection.find({}).toArray(async (err, results) => {
//       console.log("results below:");
//       console.log(results);
//       if (err) {
//         return res.send(err);
//       }
//       console.log("results[1]");
//       const result = results[1];
//       console.log("result below:");
//       console.log(result);
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.setHeader("Cache-Control", "max-age=180000");
//       res.send(result);
//       console.log(resolve());
//       client.close();
//       return result;
//     });
//   });
// });
// console.log("data then more");
