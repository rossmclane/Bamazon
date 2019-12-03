// Require db to interact with the database and the models
var db = require("../models");

// Export a function which takes in the express app
// and establishes routes
module.exports = function(app) {
  // Get route, which queries all Product entries and response with json
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  // Get route, which queries all Cart entries
  app.get("/api/cart", function(req, res) {
    db.Cart.findAll().then(function(dbCartProducts) {
      res.json(dbCartProducts);
    });
  });

  app.get("/api/products/:id", function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // PUT route for updating posts
  app.post("/api/products", function(req, res) {
    console.log("Receiving Put Request");
    db.Product.findOne({
      where: {
        product_name: req.body.product_name
      }
    }).then(function(dbProduct) {
      if (
        parseInt(req.body.quantity) >
        parseInt(dbProduct.dataValues.stock_quantity)
      ) {
        res.send("Not Enough in Stock!");
      } else {
        db.Product.decrement("stock_quantity", {
          by: req.body.quantity,
          where: {
            product_name: req.body.product_name
          }
        }).then(function() {
          res.send("Your Order Has Been Placed!");
        });
      }
    });
  });
};
