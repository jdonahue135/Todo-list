var User = require("../models/User");
var Todo = require("../models/Todo");

const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

exports.todos_get = (req, res, next) => {
    User.findById(req.params.userid)
        .select('-password')
        .populate('todos')
        .exec((err, theUser) => {
            if (err) { res.json({ success: false, message: "Error, API failed to fetch info from db" }); }
            else {
                if (!theUser) res.json({ success: false, message: "No user" });
                else res.json({success: true, todos: theUser.todos});
            };
        });
};

exports.todo_post = (req, res, next) => {
    User.findById(req.body.user._id)
        .select('todos')
        .exec((err, theUser) => {
            if (err) res.json({ success: false, message: "Error, API failed to fetch info from db" });
            else {
                if (!theUser) res.json({ success: false, message: "User not found" });
                else {
                    const new_todo = new Todo({
                        title: req.body.todo.title,
                        priority: req.body.todo.priority,
                        notes: req.body.todo.notes,
                        isDone: req.body.todo.isDone,
                        date: req.body.todo.date,
                        subTasks: [],
                    });
                    new_todo.save(err => {
                        if (err) {res.json({success: false, message: "ERROR: unable to save todo"})}
                    })
                    theUser.todos.push(new_todo);
                    theUser.save(err => {
                        if (err) {res.json({success: false, message: "ERROR: unable to save todo"})}
                        else res.json({success: true, todos: theUser.todos});
                    });
                }
            }
        })
}