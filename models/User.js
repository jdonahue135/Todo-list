var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  password: { type: String, required: true, max: 15 },
  username: { type: String, required: true, max: 15 },
  joinDate: { type: Date, default: Date.now },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

//Export model
module.exports = mongoose.model("User", UserSchema);
