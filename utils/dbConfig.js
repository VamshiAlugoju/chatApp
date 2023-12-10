const mongoose = require("mongoose");

async function connectDb() {
  try {
    const mongo = await mongoose.connect(
      process.env.MONGOURL,
      {
        dbName:  process.env.DBNAME,
      }
    );
    console.log("connection successFull", mongo.connection.host);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

module.exports = connectDb;
