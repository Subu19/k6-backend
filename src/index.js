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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1ODcwNDgyLCJleHAiOjE2NDg0NjI0ODJ9.j05pUuortFQBDEoPvUWYMV-Q7Gvs2TYcmfHGWw7pWzw",
        })
      );
      // listen for user diconnect
      socket.on("disconnect", () => console.log("a user disconnected"));
      strapi.io = socket;
    });
    // strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  },
};
