var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, max: 50 },
  password: { type: String, required: true, max: 15 },
  joinDate: { type: Date, default: Date.now },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

//Export model
module.exports = mongoose.model("User", UserSchema);
