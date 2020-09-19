var express = require('express');
var router = express.Router();
const auth = require("../config/auth");


var sub_task_controller = require("../controllers/subTaskController");

/* handle todo submit on POST */
router.post("/", auth.verifyToken, sub_task_controller.sub_task_post);

/* handle todo update on POST */
router.post("/:subtaskid/update", auth.verifyToken, sub_task_controller.sub_task_update);

module.exports = router;
