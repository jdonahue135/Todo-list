var express = require('express');
var router = express.Router();

var user_controller = require("../controllers/userController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* handle log in on POST */
router.post("/login", user_controller.login);

/* handle sign up on POST */
router.post("/signup", user_controller.signup);

module.exports = router;
