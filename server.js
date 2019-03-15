const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
// mongoose.Promise = global.Promise;
// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/releasenotes",
//   {
//     useMongoClient: true
//   }
// );

mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_cm1d9xw9:54c61t9ft6nj179avr1sji195e@ds051524.mlab.com:51524/heroku_cm1d9xw9" , {
	useMongoClient: true
});

var db = mongoose.connection;

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
