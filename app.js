const express = require("express");
// import connectDb from "./utils/dbConfig";
const connectDb = require("./utils/dbConfig");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const app = express();
app.use(bodyParser({ extended: "application/json" }));

const PORT = 8080;

app.use("/api/user", userRoutes);

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
