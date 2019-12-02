module.exports = function(sequelize, DataTypes) {
  // sequelize.define creates a model object
  // based on the schema definition passed into it
  // It includes important query methods to be used later
  var Cart = sequelize.define(
    "Cart",
    {
      product_name: {
        type: DataTypes.STRING,
        field: "product_name"
      },

      price: {
        type: DataTypes.STRING,
        field: "price"
      },

      quantity: {
        type: DataTypes.STRING,
        field: "quantity"
      }
    },
    {
      timestamps: false
    }
  );

  return Cart;
};
