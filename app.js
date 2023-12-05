const express = require("express");
const connectDb = require("./utils/dbConfig");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const groupRoutes = require("./Routes/groupRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const cors = require("cors");
const test = require("./Controllers/testController");
const app = express();
app.use(bodyParser({ extended: "application/json" }));
app.use(cors({ origin: "*" }));
const PORT = 8080;

app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/chat/", chatRoutes);

app.use("/test", test.test);

app.get("/son", (req, res) => {
  res.send("listening nigga");
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is listening");
    });
  })
  .catch((err) => {
    process.exit(1);
  });
