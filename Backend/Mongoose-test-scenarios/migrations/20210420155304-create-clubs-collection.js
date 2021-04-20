// See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
module.exports = {
  async up(db, client) {
    return db.collection('clubs').updateMany({}, {});
  },

  async down(db, client) {
    db.dropCollection('User', (err) => {
      if (err) console.log(err);
      console.log('Users dropped');
    });
  }
};
