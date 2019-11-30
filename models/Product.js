// Export a function that returns the sequelize object
module.exports = function(sequelize, DataTypes) {
  // sequelize.define creates a model object
  // based on the schema definition passed into it
  // It includes important query methods to be used later
  var Product = sequelize.define(
    "Product",
    {
      product_name: {
        type: DataTypes.STRING,
        field: "product_name"
      },

      department_name: {
        type: DataTypes.STRING,
        field: "department_name"
      },

      price: {
        type: DataTypes.STRING,
        field: "price"
      },

      stock_quantity: {
        type: DataTypes.STRING,
        field: "stock_quantity"
      }
    },
    {
      timestamps: false
    }
  );

  return Product;
};
