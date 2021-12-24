const router = require("express").Router();
const chatcontroller = require("../controllers/chatcontroller");

router.post("/message", chatcontroller.Send);

module.exports = router;
