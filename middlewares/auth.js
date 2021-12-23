const jwt = require("jsonwebtoken");
const Session = require("../models/sessionsmodel");
module.exports = checktoken = async (req, res, next) => {
  var token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          let tokendata = jwt.decode(token);
          await Session.findOneAndDelete({ email: tokendata.payload.email })
            .then((doc) => {
              console.log(doc);
            })
            .catch((e) => console.log(e));
          return res.send("session expired");
        }
        res.status(403).send({ success: false, message: err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No Token Provided." });
  }
};
