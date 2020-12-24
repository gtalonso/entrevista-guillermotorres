import express from "express";

import config from "./config.js";

const app = express();

// health check endpoint.
app.get("/", (req, res) => {
  res.send("working healthy");
});

app.listen(config.api.port, () => {
  console.log(`exercise listenning at http://localhost:${config.api.port}`);
});