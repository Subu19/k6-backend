"use strict";

/**
 *  order controller
 */
const _ = require("lodash");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async displayhtml(ctx) {
    ctx.body = `{"data":{"verified": true},"error":null}`;
  },
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.service("api::order.order").create(data, { files });
    } else {
      entity = await strapi
        .service("api::order.order")
        .create(ctx.request.body);
    }
    strapi.io.emit("newOrder", entity);

    // or send custom event

    return this.sanitizeOutput(entity, ctx);
  },
}));
