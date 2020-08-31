var User = require("../models/User");

const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

// handle sign up on POST
exports.signup = (req, res, next) => {
    // Validate fields.
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Username must be specified.")
      .isAlphanumeric()
      .withMessage("Username has non-alphanumeric characters."),
      body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Password must be specified.")
        .isAlphanumeric()
        .withMessage("Password has non-alphanumeric characters.");
        body("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters.");
    // Sanitize fields.
    sanitizeBody("username").escape(), sanitizeBody("password").escape(), sanitizeBody("name").escape();
  
    //Validate input
    if (req.body.username == "") {
      res.json({ message: "username must be specified" });
    }
    if (req.body.password == "") {
      res.json({ message: "password must be specified" });
    }
    if (req.body.name == "") {
        res.json({ message: "name must be specified" });
      }
  
    //Verify that username does not already exist
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return next(err);
      if (user) {
        res.json({ message: "username already exists" });
      }
      if (!user) {
        //Save new user
        bcrypt.hash(
          req.body.password,
          parseInt(process.env.SALT, 10),
          (err, hashedPassword) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            const new_user = new User({
              username: req.body.username,
              password: hashedPassword,
              name: req.body.name,
            });
            new_user.save((err) => {
              if (err) return next(err);
            });
            //commented out until jwt is implemented: get token for user
            /*jwt.sign({ new_user }, process.env.SECRET_KEY, (err, token) => {
              if (err) return next(err);*/
              //else {
                res.json({
                  //token: token,
                  user: new_user,
                });
              //}
            //});
          }
        );
      }
    });
  };

  // Handle login on POST
exports.login = function (req, res, next) {
    User.findOne({ username: req.body.username }, (err, theUser) => {
      if (err) {
        res.json({ success: false, err });
      }
      if (!theUser) {
        res.json({ success: false, message: "username does not exist" });
      } else {
        bcrypt.compare(req.body.password, theUser.password, (err, result) => {
          if (err) {
            res.json({ success: false, err });
          }
          if (result) {
            //commented out until jwt is implemented
            /*jwt.sign({ theUser }, process.env.SECRET_KEY, (err, token) => {
              if (err) return next(err);
              else {*/
                res.json({
                  //token: token,
                  user: theUser,
                });
              //}
            //});
          } else {
            res.json({ success: false, message: "passwords do not match" });
          }
        });
      }
    });
  };
  