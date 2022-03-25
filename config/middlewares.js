module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src-attr": ["'unsafe-inline'"],
          "frame-src": [
            "'unsafe-inline'",
            "http://www.openstreetmap.org/",
            "https://plyr.link/",
          ],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: false,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
