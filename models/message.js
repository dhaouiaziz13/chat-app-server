const { Schema, model } = require("mongoose");
const msg =new Schema({
  body:String,
  sendername:String,
  receivername:String,
  createdat: {
    type: Date,
    default: Date.now(),
  },
})
const messageSchema = new Schema({
  messages: { type: [msg], default: [] },
  senderid: Schema.Types.ObjectId,
  receiverid: Schema.Types.ObjectId,
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model("messages", messageSchema);
module.exports = Message;
