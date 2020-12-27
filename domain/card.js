import crypto from "crypto";

import config from "../config.js";
import { PANDigitsError, PANLenError } from "./errors.js";

class Card {
  constructor({ cardNumber, userId, brandType, cardRepository }) {
    this.pan = String(cardNumber);
    this.userId = String(userId);
    this.brandType = brandType;
    this.repo = cardRepository;
  }

  process() {
    return {
      userId: this.userId,
      cardToken: this.hashPAN(),
      brandType: this.brandType,
      maskedNumber: this.maskCardNumber(),
    };
  }

  maskCardNumber() {
    let digits = this.pan.slice(0, -4);
    let last4Digits = this.pan.slice(-4);
    return digits.replace(/./g, "*") + last4Digits;
  }

  validCardNumber() {
    if (/\D/.test(this.pan)) {
      return false;
    }
    return true;
  }

  validCardNumberLen() {
    let panLen = this.brandType === "amex" ? 15 : 16;
    if (this.pan.length != panLen) {
      return false;
    }
    return true;
  }

  hashPAN() {
    console.log(this.pan);
    if (!this.validCardNumber()) {
      throw new PANDigitsError();
    }
    if (!this.validCardNumberLen()) {
      throw new PANLenError(this.brandType);
    }
    return hash(this.pan);
  }

  create() {
    return this.repo.save(this.process);
  }

  static getByUserId(userId, cardRepository) {
    return cardRepository.findByUserId(userId);
  }
}

const hash = (pan) =>
  crypto
    .createHmac(config.hashing.method, config.hashing.key)
    .update(pan)
    .digest("hex");

export default Card;
