module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2b5b93233ca154bc4359d3ac83d1a64f'),
  },
});
