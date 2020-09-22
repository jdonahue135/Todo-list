var User = require("../models/User");
var Todo = require("../models/Todo");
var SubTask = require("../models/SubTask");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    // Sanitize fields.
    sanitizeBody("username").escape(), sanitizeBody("password").escape();
  
    //Validate input
    if (req.body.username == "") {
      res.json({ message: "username must be specified" });
    }
    if (req.body.password == "") {
      res.json({ message: "password must be specified" });
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
            
            //if user made todos before signing up, make todos
            let todos = [];
            if (req.body.todos.length > 1) {
              for (let i = 0; i < req.body.todos.length; i++) {
                let subTasks = []
                if (req.body.todos[i].subTasks.length > 0) {
                  
                  //iterate through subTasks and add to DB
                  for (let x = 0; x < req.body.todos[i].subTasks.length; x++) {
                    const new_subtask = new SubTask({
                      title: req.body.todos[i].subTasks[x].title,
                      isDone: req.body.todos[i].subTasks[x].isDone,
                    });
                    subTasks.push(new_subtask)
                    new_subtask.save((err) => {
                      if (err) return next(err);
                    });
                  }
                }
                const new_todo = new Todo({
                  title: req.body.todos[i].title,
                  priority: req.body.todos[i].priority,
                  notes: req.body.todos[i].notes,
                  isDone: req.body.todos[i].isDone,
                  date: req.body.todos[i].date,
                  subTasks: subTasks,
                });
                todos.push(new_todo);
                new_todo.save((err) => {
                  if (err) return next(err);
                });
              };
            };
            const new_user = new User({
              username: req.body.username,
              password: hashedPassword,
              todos: todos,
            });
            new_user.save((err) => {
              if (err) return next(err);
            });

            //commented out until jwt is implemented: get token for user
            jwt.sign({ new_user }, process.env.SECRET_KEY, (err, token) => {
              if (err) return next(err);
              else {
                res.json({
                  success: true,
                  token: token,
                  user: new_user,
                });
              }
            });
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
      else if (!theUser) {
        res.json({ success: false, message: "username does not exist" });
      } else {
        bcrypt.compare(req.body.password, theUser.password, (err, result) => {
          if (err) {
            res.json({ success: false, err });
          }
          if (result) {
            //commented out until jwt is implemented
            jwt.sign({ theUser }, process.env.SECRET_KEY, (err, token) => {
              if (err) return next(err);
              else {
                res.json({
                  token: token,
                  user: theUser,
                });
              }
            });
          } else {
            res.json({ success: false, message: "passwords do not match" });
          }
        });
      }
    });
  };
  