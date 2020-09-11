var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: { type: String, max: 50, required: true },
    priority: { type: Boolean, default: false },
    notes: { type: String, max: 240 },
    isDone: { type: Boolean, default: false},
    date: { type: Date, default: Date.now },
    subTasks: [{ type: Schema.Types.ObjectId, ref: "SubTask" }],
});

//Export model
module.exports = mongoose.model("Todo", TodoSchema);