var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile("../public/index.html");
  });
};
