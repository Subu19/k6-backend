"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // console.log("testing");
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    // import socket io
    // var io = require("socket.io")(strapi.server);
    // // listen for user connection
    io.on("connection", function (socket) {
      // send message on user connection
      console.log("a user had connected");

      socket.emit(
        "hello",
        JSON.stringify({
          message: "Hello food lover",
          jwtToken:
            "07f1e871923ccad85d93129c5ff7501217b811c85d74688b540a609c0c8f65e652f113b967a0ae74fcf35c9ac405b93b6c4199c26eae51211e363d480dc26e43dce47b1b16f79a3a215b6a12caaa02bbc980e0d287f20d1a32124ddf80bfd54d00949d65eb25487b99e1c79e6f59e2cce8825ccb1141583a1df78f9ec889ccab",
        })
      );
      // listen for user diconnect
      socket.on("disconnect", () => console.log("a user disconnected"));
      strapi.io = socket;
    });
    // strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  },
};
