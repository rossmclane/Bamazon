var db = require("../models");

module.exports = function(app) {
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  app.get("/api/products/:name", function(req, res) {
    db.Product.findOne({
      where: {
        product_name: req.params.name
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.post("/api/products/", function(req, res) {
    db.Product.create(req.body).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

   // PUT route for updating posts
   app.put("/api/products", function(req, res) {
    db.Products.update(
        {stock_quantity: stock_quantity - req.body.quantity},
        {where: req.params.product_name}
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
