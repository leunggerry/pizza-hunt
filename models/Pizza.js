/**
 * Import Libraries
 */
const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [], // could be Aray instead of brackets to indicate type
});

// Create the model with the scheme and export it
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
