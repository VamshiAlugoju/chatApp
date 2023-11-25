const mongoose = require("mongoose");

async function connectDb() {
  try {
    const mongo = await mongoose.connect(
      "mongodb+srv://VamshiKrishna:Vamshi123@cluster0.vsxibmi.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "application",
      }
    );
    console.log("connection successFull", mongo.connection.host);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

module.exports = connectDb;
