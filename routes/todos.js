var express = require('express');
var router = express.Router();
const auth = require("../config/auth");


var todos_controller = require("../controllers/todosController");

/* handle todos request on GET */
router.get("/:userid", auth.verifyToken, todos_controller.todos_get);

/* handle todo submit on POST */
router.post("/", auth.verifyToken, todos_controller.todo_post);

/* handle todo update on POST */
router.post("/:todoid/update", auth.verifyToken, todos_controller.todo_update);

/* handle todo delete on POST */
router.post("/:todoid/delete", auth.verifyToken, todos_controller.todo_delete);

module.exports = router;
