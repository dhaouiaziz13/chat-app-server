const Joi = require("joi");
const crypt = require("bcryptjs");
const User = require("../models/usermodel");
const Session = require("../models/sessionsmodel");
const jwt = require("jsonwebtoken");
//---------------------------validation schemas----------------------
const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(8).required(),
});

const SignUpSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  username: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});
//----------------------------------------------------------------------
exports.Login = async (req, res) => {
  const validation = LoginSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  //--jwt auth--
  const { email, password } = req.body;
  const checkuser = await User.findOne({ email });
  if (!checkuser) {
    return res.status(404).send("user not found");
  }
  const checksession = await Session.findOne({ email });
  if (checksession) {
    return res.status(200).send(checksession);
  } else if (!checksession) {
    let checkpass = crypt.compareSync(password, checkuser.password);
    if (checkpass) {
      let token = jwt.sign({ payload: checkuser }, process.env.KEY, {
        expiresIn: "30d",
      });
      const createsession = new Session({
        email: checkuser.email,
        token,
      });
      createsession
        .save()
        .then(() => {
          console.log("session created");
        })
        .catch((e) => {
          console.log("error occured during session creation");
        });
      return res.send(token);
    }
  }
  return res.send("auth failed");
};
//-----------------------------------------------------------
exports.Signup = async (req, res) => {
  const validation = SignUpSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error.details[0].message);
  }
  const { email, username, password } = req.body;
  const checkuser = await User.findOne({ email });
  if (checkuser) {
    return res.status(200).json(checkuser);
  }
  const newuser = new User({
    email,
    username,
    password: crypt.hashSync(password, 8),
  });
  newuser
    .save()
    .then(() => console.log("user saved"))
    .catch((err) => console.log(err));
  return res.status(200).send("ok");
};
//-------------------------------------------------------------------------
exports.Logout = async (req, res) => {
  const { email } = req.body;
  const isfound = await Session.findOneAndDelete({ email });
  if (isfound) {
    return res.send('session deleted');
  }
  return res.send("session doesn't exist");
};
