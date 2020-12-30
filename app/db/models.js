import db from "./db.js";

const CardModel = db.model("Card", {
  userId: String,
  cardToken: String,
  brandType: {
    type: String,
    enum: {
      values: ["visa", "mastercard", "discover", "amex"],
      message: "Invalid card brand",
    },
  },
  maskedNumber: String,
  primary: {
    type: Boolean,
    default: true,
  },
});

export { CardModel };
