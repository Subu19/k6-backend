module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: [
      "r5f0wGmIiKllbkFGrbzvvw==",
      "m0yE/v6NRarRmKU/5iJsww==",
      "OR0OKtNkfYkUdZizWKWaow==",
      "VL9XfkYkROXtaxPDZO6HhQ==",
    ],
  },
});
