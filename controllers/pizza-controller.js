const { Pizza } = require("../models");

const pizzaController = {
  //Functions for the methods go here
  getAllPizzas(req, res) {
    Pizza.find({})
      .populate({
        //to join the tables so the actual comment body is shown
        path: "comments",
        select: "-__v", // select means we dont care about the __v field on the comments, - means we dont want it returned
      })
      //update the query to not get the __v field
      .select("-__v")
      //sort so the newest pizz is return first
      .sort({ _id: -1 })
      .then((dbPizzaData) => {
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      //update the query to not get the __v field
      .select("-__v")
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //createPizza
  createPizza({ body }, res) {
    //destruct body out of req
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    // find single doc that we want to update
    // updateOne() or updateMany() update documents without returning them
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      // {new: true} will return the new version of the doc
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza
  // could use .deleteOne() or deleteMan()
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
