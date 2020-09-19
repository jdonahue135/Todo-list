var User = require("../models/User");
var Todo = require("../models/Todo");

const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

exports.todos_get = (req, res, next) => {
    User.findById(req.params.userid)
        .select('-password')
        .populate({
            path: "todos",
            populate: {
              path: "subTasks",
            },
          })
        .exec((err, theUser) => {
            if (err) { res.json({ success: false, message: "Error, API failed to fetch info from db" }); }
            else {
                if (!theUser) res.json({ success: false, message: "No user" });
                else res.json({success: true, todos: theUser.todos});
            };
        });
};

exports.todo_post = (req, res, next) => {

    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),

    // Sanitize fields.
    sanitizeBody('title').escape(),
    sanitizeBody('notes').escape(),

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
};

exports.todo_update = (req, res, next) => {
    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),

    // Sanitize fields.
    sanitizeBody('title').escape(),
    sanitizeBody('notes').escape();
    
    const original_todo = Todo.findById(req.params.todoid)

    //object is a Todo
    const todo = new Todo({
        _id: req.params.todoid,
        title: req.body.todo.title,
        notes: req.body.todo.notes,
        priority: req.body.todo.priority,
        isDone: req.body.todo.isDone,
        date: req.body.todo.date,
        subTasks: req.body.todo.subTasks,
    });

    if (todo === original_todo) {
        res.json({success: false, message: "no change necessary"});
    } else {
        Todo.findByIdAndUpdate(req.params.todoid, todo, err => {
            if (err) res.json({success: false, err: err});
            else res.json({success: true, message: "todo updated"});
        })
    }
}