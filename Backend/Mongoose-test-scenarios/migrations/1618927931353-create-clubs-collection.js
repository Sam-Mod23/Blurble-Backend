const { db } = require("../app");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  await this("Club").update(
    {},
    {
      clubName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currentBook: { type: Object, required: true },
      nominatedBooks: Array,
      memberIds: { type: Array, required: true },
      adminIds: { type: Array, required: true },
      thumbnail: String,
      comments: Array,
      archivedBooks: Array,
    }
  );
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  db.dropCollection("User", (err) => {
    if (err) console.log(err);
    console.log("Users dropped");
  });
}

module.exports = { up, down };
