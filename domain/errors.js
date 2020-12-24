class PANLenError extends Error {
  constructor(brandType) {
    super(`The length for ${brandType} is wrong`);
    this.name = "PANError";
  }
}

class PANDigitsError extends Error {
  constructor() {
    super("The card number must be only digits");
    this.name = "PANDigitsError";
  }
}

export { PANLenError, PANDigitsError };
