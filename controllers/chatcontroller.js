const Message = require("../models/message");
const joi = require("joi");

const messageformat = joi.object({
  body: joi.string().required(),
  sendername: joi.string().required(),
  receivername: joi.string().required(),
  senderid: joi.string().required(),
  receiverid: joi.string().required(),
});

exports.Send = async (req, res) => {
  //   console.log(req.body);
  const validation = messageformat.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  try {
    const { body, sendername, receivername, senderid, receiverid } = req.body;
    const messagetosend = new Message({
      body,
      sendername,
      receivername,
      senderid,
      receiverid,
    });
    messagetosend
      .save()
      .then(() => {
        console.log("saved");
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
