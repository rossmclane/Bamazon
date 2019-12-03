// Requirements
var express = require("express");
var exphbs = require("express-handlebars");

// Must require db to interact with the database
var db = require("./models");

// Create the app
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware so App can parse post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve Static Directory
app.use(express.static("./public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes")(app);

var seedData = require("./seedData.js");
// Sync Models & Set Express Server to Listen
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    db.bulkCreate(seedData);
  });
});
