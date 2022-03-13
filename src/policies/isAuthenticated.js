module.exports = async (ctx, config, { strapi }) => {
  // console.log(policyContext.state.user);

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    // if a session is open
    console.log(ctx.request.header.authorization);
    try {
      const { id, isAdmin = true } = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);

      console.log(isAdmin);
    } catch (err) {
      // It will be there!
      console.log(err);
      return false;
    }
    // go to next policy or reach the controller's action
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
