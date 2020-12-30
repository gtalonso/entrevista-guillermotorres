import crypto from "crypto";

import config from "../config.js";
import { PANDigitsError, PANLenError, DBError } from "./errors.js";

class Card {
  constructor({ cardNumber, userId, brandType }, cardRepository) {
    this.pan = String(cardNumber);
    this.userId = String(userId);
    this.brandType = brandType;
    this.repo = cardRepository;
  }

  async process() {
    let isPrimary = await this.repo.isFirstCard(this.userId);
    return {
      userId: this.userId,
      cardToken: this.hashPAN(),
      brandType: this.brandType.toLowerCase(),
      maskedNumber: this.maskCardNumber(),
      primary: isPrimary,
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
    if (!this.validCardNumber()) {
      throw new PANDigitsError();
    }
    if (!this.validCardNumberLen()) {
      throw new PANLenError(this.brandType);
    }
    return hash(this.pan);
  }

  async create() {
    let card = await this.process();
    let result = this.repo.save(card);
    if (result.errors) {
      throw new DBError(result.message);
    }
    return result;
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
