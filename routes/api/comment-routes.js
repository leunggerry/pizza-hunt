const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// Setup the add comment
// /api/comments/:pizzaId
router.route("/:pizzaId").post(addComment);

// Setup the delte comment
// /api/comments/:pizzaId/:commentId
// Setup a PUT route for addReply
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// Delete reply to a comment
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
