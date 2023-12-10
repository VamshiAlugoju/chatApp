const express = require("express");
const connectDb = require("./utils/dbConfig");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const groupRoutes = require("./Routes/groupRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const test = require("./Controllers/testController");
const http = require("http")
const socketIo = require("socket.io");
const cors = require("cors")
const app = express();
const server = http.createServer(app)
const multer = require("multer");
require('dotenv').config()
const upload = multer();
const io = socketIo(server,{
    cors:{
        origin:"http://localhost:4173"
    }
});
const chatControllers = require("./Controllers/chatControllers");
// const io = new Sserver(server,{
//   cors:{
//       origin:"*"
//   }
// })
app.use(bodyParser({ extended: "application/json" }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
const PORT = 8080;

app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/chat/", chatRoutes);

app.use("/test",upload.single("file") ,test.test);

app.get("/son", (req, res) => {
  res.send("listening nigga");
});
  
io.on('connection', (socket) => {
  console.log("connected to socket io")
  socket.on("setup",(user)=>{
    socket.join(  user._id);
    socket.emit("connected")
    console.log(user._id ,user.name ,"joined " )
  })
  socket.on("join room",(id)=>{
    socket.join(id);
    console.log("joined in" , id);
  })
  socket.on("send message",(data)=>{

    socket.to(data.id).emit('recieve message', data);
  })
})
// chatControllers.chatSSocket(io);

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is listening");
    });
  })
  .catch((err) => {
    process.exit(1);
  });
