var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    title: { type: String, max: 40 },
    notes: { type: String, max: 240 },
    dueDate: { type: Date, required: false },
    date: { type: Date, default: Date.now },
    todoList: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

//Export model
module.exports = mongoose.model("Project", ProjectSchema);