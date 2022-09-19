const router = require("express").Router();
const { addComment, removeComment } = require("../../controllers/comment-controller");

// Setup the add comment
// /api/comments/:pizzaId
router.route("/:pizzaId").post(addComment);

// Setup the delte comment
// /api/comments/:pizzaId/:commentId
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;
