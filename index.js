const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: "*"});
const cors = require("cors");
const connect=require('./db/index')
const morgan =require('morgan')
connect()
//-------------------------
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
//-----------------------
io.on('connection',(socket)=>{
console.log('connected')
})
//-------------------auth routes-----------------------
app.use('/auth',require('./routes/main'))

//--------------test route------------------
app.get("/", (req, res) => {
  res.send("yooo");
});
//----------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
