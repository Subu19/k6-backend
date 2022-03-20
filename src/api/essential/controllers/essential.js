'use strict';

/**
 *  essential controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::essential.essential');
