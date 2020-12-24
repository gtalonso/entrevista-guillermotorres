import mongoose from "mongoose";

import config from "../../config.js";

mongoose.connect(config.database.uri).catch((error) => {
  console.log(
    `Error while connecting to mongo db for first time, error: ${error}`
  );
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error while connecting to mongo db error: ${error}`);
});

export default db;
