// Requirements
var express = require("express");
var db = require("./models");

// Create the app
var app = express();
var PORT = process.env.PORT || 8080;

// Middleware so App can parse post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve Static Directory
app.use(express.static("public"));

// Require Routes
// We could put all of our route logic here because app is here
// But it is often simpler to write the logic separately and import here
// Also remember this require statement resovles to what is exported in
// That file. In this case a function that takes in 'app'
require("./routes/api-routes.js")(app);
// require("./routes/html-routes")(app);

// Sync Models & Set Express Server to Listen
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
