'use strict';

/**
 * essential router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::essential.essential');
