module.exports = {
  routes: [
    {
      method: "GET",
      path: "/checkAuth",
      handler: "order.displayhtml",
      config: {
        auth: false,
        policies: ["global::verifyToken"],
      },
    },
  ],
};
