const router = require("express").Router();
//import the pizza controller methods
//desctruct method names ranter than doing pizzaController.getAllPizza()
const {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");

// Set up GET all and POST at /api/pizzas
// this is to avoid creating duplicate routes for indvidual HTTP methods
// provide name of controller as callback
router.route("/").get(getAllPizzas).post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;
