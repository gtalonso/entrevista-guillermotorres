import { PANError } from "./errors.js";

class Card {
  constructor(pan, brandType, userId) {
    this.pan = String(pan);
    this.userId = userId;
    this.brandType = brandType;
  }

  process() {
    return {
      userId: this.userId,
      cardToken: this.hashPAN(),
      brandType: this.brandType,
      maskedNumber: this.maskCardNumber(),
    };
  }

  maskCardNumber() {}

  validCardNumber() {
    let panLen = this.brandType === "amex" ? 15 : 16;
    if (/\D/.test(this.pan) || this.pan.length != panLen) {
      return false;
    }
    return true;
  }

  hashPAN() {
    if (!this.validCardNumber()) {
      throw new PANError();
    }
  }
}

export default Card;
