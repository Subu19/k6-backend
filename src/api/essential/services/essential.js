'use strict';

/**
 * essential service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::essential.essential');
