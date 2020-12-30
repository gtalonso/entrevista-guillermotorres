"use strict";

import express from "express";

import config from "./config.js";
import router from "./app/routes.js";
import db from "./app/db/db.js";

const app = express();

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong please try again latter.");
});

app.use("/creditcard", router);

// health check endpoint.
app.get("/", (req, res) => {
  res.json({ timestamp: Date.now() });
});

app.listen(config.api.port, config.api.host, () => {
  console.log(`exercise listenning at http://localhost:${config.api.port}`);
});
