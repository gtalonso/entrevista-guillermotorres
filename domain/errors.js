class PANLenError extends Error {
  constructor(brandType) {
    super(`The card number length for ${brandType} is wrong`);
    this.name = "PANError";
  }
}

class PANDigitsError extends Error {
  constructor() {
    super("The card number must be only digits");
    this.name = "PANDigitsError";
  }
}

class DBError extends Error {
  constructor(message) {
    super(message);
    this.name = "DBError";
  }
}

export { PANLenError, PANDigitsError, DBError };
