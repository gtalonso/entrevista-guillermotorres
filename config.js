const config = {
  database: {
    uri: process.env.DATABSE_URI || "mongodb://localhost:27017/cc_app",
  },
  hashing: {
    method: process.env.HASH_METHOD || "sha256",
    key:
      process.env.HASH_KEY ||
      "4a153ea595c6ab84e61aab19620aa88c8b4ed51c0397beb5deca2f76ca6346d1",
  },
  api: {
    port: process.env.PORT || 3000,
  },
};

export default config;
