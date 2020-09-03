var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubTaskSchema = new Schema({
    title: { type: String, max: 40 },
    isDone: { type: Boolean, default: false},
});

//Export model
module.exports = mongoose.model("SubTask", SubTaskSchema);