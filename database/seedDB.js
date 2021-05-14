const { seedFunction } = require("./seed");

seedFunction().then(() => {
  console.log("Database seeded");
});
