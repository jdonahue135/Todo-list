var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: { type: String, max: 40 },
    dueDate: { type: Date, required: false },
    date: { type: Date, default: Date.now },
    priority: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("Todo", TodoSchema);