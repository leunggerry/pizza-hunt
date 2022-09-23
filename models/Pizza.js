/**
 * Import Libraries
 */
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), //get implementation from util
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
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
      //virtuals: true,
      getters: true, // need to tell Mongoose it should use any getter function thats specified
    },
    id: false, //id is false b/c this is virutal that Mongoose returns, and dont need
  }
);

// Mongoose Virtuals - add virtual propers to a doc that aren't stored in the DB
//                     Computed values that are evaluated when they are accessed
// Get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  // method to tally up the total of every comment with its replies. In
  // its basic form, .reduce() takes two parameters, an accumulator and
  // a currentValue. Here, the accumulator is total, and the currentValue
  // is comment. As .reduce() walks through the array, it passes the
  // accumulating total and the current value of comment into the function,
  // with the return of the function revising the total for the next iteration
  // through the array.
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// Create the model with the scheme and export it
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
