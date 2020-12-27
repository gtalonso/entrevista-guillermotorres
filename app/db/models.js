import db from "./db.js";

const CardModel = db.model("Card", {
  userId: String,
  cardToken: String,
  brandType: String,
  primary: Boolean,
});

export { CardModel };
