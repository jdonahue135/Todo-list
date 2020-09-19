var Todo = require("../models/Todo");
var SubTask = require("../models/SubTask");
var async = require("async");

const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

exports.sub_task_post = (req, res, next) => {

    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),

    // Sanitize fields.
    sanitizeBody('title').escape(),

    Todo.findById(req.body.todo._id)
        .select('subTasks')
        .exec((err, theTodo) => {
            if (err) res.json({ success: false, message: "Error, API failed to fetch info from db" });
            else {
                if (!theTodo) res.json({ success: false, message: "Todo not found" });
                else {
                    const newSubTask = new SubTask({
                        title: req.body.subTask.title,
                        isDone: req.body.subTask.isDone,
                    });
                    newSubTask.save(err => {
                        if (err) {res.json({success: false, message: "ERROR: unable to save sub task"})}
                    })
                    theTodo.subTasks.push(newSubTask);
                    theTodo.save(err => {
                        if (err) {res.json({success: false, message: "ERROR: unable to save sub task"})}
                        else res.json({success: true, message: "sub task saved"});
                    });
                }
            }
        })
};

exports.sub_task_update = (req, res, next) => {
    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),

    // Sanitize fields.
    sanitizeBody('title').escape();
    
    const originalSubTask = SubTask.findById(req.params.subtaskid)
    const subTask = new SubTask({
        _id: req.params.subtaskid,
        title: req.body.subTask.title,
        isDone: req.body.subTask.isDone,
    });
    if (originalSubTask === subTask) {
        return;
    } else {
        SubTask.findByIdAndUpdate(req.params.subtaskid, subTask, err => {
            if (err) res.json({success: false, err: err});
            else res.json({success: true, message: "sub task updated"});
        });
    };
}

exports.sub_task_delete = (req, res, next) => {
    async.parallel({
        todo: (callback) => {
            Todo.findById(req.body.parent._id).exec(callback)
        },
        subTask: (callback) => {
            SubTask.findById(req.params.subtaskid).exec(callback)
        },
    }, (err, results) => {
        if (err) res.json({success: false, err})
        if (!results.todo) res.json({success: false, message: "todo not found"})
        if (!results.subTask) res.json({success: false, message: "sub task not found"})
        results.todo.subTasks.splice(results.todo.subTasks.indexOf(results.subTask._id), 1);
        results.subTask.remove(err => {
            if (err) res.json({success: false, err});
        })
        results.todo.save(err => {
            if (err) res.json({success: false, err});
        });
        res.json({success: true, message: "sub task deleted"})
    });
}