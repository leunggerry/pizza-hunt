/**
 * Import Libraries
 */
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), //get implementation from util
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [], // could be Aray instead of brackets to indicate type
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  //adding schema options
  {
    toJSON: {
      virtuals: true,
      getters: true, // need to tell Mongoose it should use any getter function thats specified
    },
    id: false, //id is false b/c this is virutal that Mongoose returns, and dont need
  }
);

// Mongoose Virtuals - add virtual propers to a doc that aren't stored in the DB
//                     Computed values that are evaluated when they are accessed
// Get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Create the model with the scheme and export it
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
