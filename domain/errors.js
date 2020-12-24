class PANError extends Error {
  constructor(message) {
    super("Pan cointain other than numbers or wrong length");
    this.name = "PANError";
  }
}

export { PANError };
