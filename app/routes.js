import express from "express";

import CardHandler from "./handlers.js";

const router = express.Router();

router.post("/", (req, res) => {
  CardHandler.saveCard(req)
    .then((card) => res.json(card))
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  CardHandler.getCards(req).then((cards) => {
    res.json(cards);
  });
});

export default router;
