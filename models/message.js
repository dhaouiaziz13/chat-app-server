const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  body: String,
  sendername: String,
  receivername: String,
  senderid: Schema.Types.ObjectId,
  receiverid: Schema.Types.ObjectId,
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model("messages", messageSchema);
module.exports = Message;
