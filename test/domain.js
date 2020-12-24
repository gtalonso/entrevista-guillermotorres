import chai from "chai";
const { expect } = chai;

import Card from "../domain/card.js";
import { PANError } from "../domain/errors.js";

describe("Card data hashing", () => {
  const dummyVisaCard = {
    userId: 1,
    cardToken:
      "64c503df9c9c035c2ab2787a7bb304efbc4927833a98c16b9799887e76a0420c", //'1234567891011123'
    brandType: "visa",
    maskedNumber: "************1123",
    primary: true,
  };

  const dummyAmexCard = {
    userId: 1,
    cardToken:
      "6fde2060713c623f4192b911efa2657d4779ede90be8233ed5c9f051a0fc8c87", //'123456781011123'
    brandType: "amex",
    maskedNumber: "***********1123",
    primary: false,
  };
  //this works for visa, mastercard and discovercards.
  describe("Visa card validation and hashing", () => {
    let newCard = new Card("1234567891011123", "visa");
    let processed = newCard.process();
    it("PAN must be 16 digits", () => {
      let worngCard = new Card("234567891011123", "visa");
      expect(worngCard.process).to.throw();
    });
    it("Should mask the cardNumber", () => {
      expect(processed.maskedNumber).to.be.equal(dummyVisaCard.maskedNumber);
    });
    it("Should hash PAN", () => {
      expect(processed.cardToken).to.be.equal(dummyVisaCard.cardToken);
    });
  });
  // this works for american express cards.
  describe("Amex card validation and hashing", () => {
    let newCard = new Card("123456781011123", "amex");
    let processed = newCard.process();
    it("PAN must be 15 digits", () => {
      let worngCard = new Card("2345678910111231", "amex");
      expect(newCard.process()).to.throw(PanError);
    });
    it("Should mask the cardNumber", () => {
      expect(processed.maskedNumber).to.be.equal(dummyAmexCard.maskedNumber);
    });
    it("Should hash PAN", () => {
      expect(processed.cardToken).to.be.equal(dummyAmexCard.cardToken);
    });
  });
});
