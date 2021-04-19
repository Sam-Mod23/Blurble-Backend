const db = require("../app");

db.once("open", () => {
  db.dropDatabase().then((err) => {
    if (err) console.log(err);
    console.log("Database dropped");
  });
});
