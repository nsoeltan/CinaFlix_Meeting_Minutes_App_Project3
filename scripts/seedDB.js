const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Notes collection and inserts the notes below

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/releasenotes",
//   {
//     useMongoClient: true
//   }
// );

const noteSeed = [
  {
    meetingTitle: "",
    author: "",
    note: "",
    date: new Date(Date.now())
  }
];

db.Note.remove({})
  .then(() => db.Note.collection.insertMany(noteSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
