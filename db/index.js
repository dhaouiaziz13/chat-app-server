const { connect } = require("mongoose");

module.exports = () =>
  connect(
    "mongodb+srv://dhaouiaziz13:123123Asd.@cluster0.cxxvc.mongodb.net/chat?retryWrites=true&w=majority"
  )
    .then(() => console.log("connected"))
    .catch((err) => console.log("bummer error"));
