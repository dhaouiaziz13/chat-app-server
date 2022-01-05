const Message = require("../models/message");
const joi = require("joi");

const messageformat = joi.object({
  body: joi.string().required(),
  senderid: joi.string().required(),
  receiverid: joi.string().required(),
});

exports.Send = async (req, res) => {
  //   console.log(req.body);
  const validation = messageformat.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }

  const { body, senderid, receiverid } = req.body;
  const conv = await Message.findOne({ $and: [{ senderid }, { receiverid }] });
  // console.log(conv)
  if (conv) {
    conv.messages = [...conv.messages, body];
    conv
      .save()
      .then((res) => console.log("updated"))
      .catch((err) => console.log(err));
    return res.status(200).send('updated');
  }
  try {
    // console.log(body)
    const messagetosend = new Message({
      messages: body,
      senderid,
      receiverid,
    });
    messagetosend
      .save()
      .then(() => {
        return res.status(200).send("sent");
      })
      .catch((e) => {
        console.log("error occured");
        return res.status(500).send(e);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};
