const jwt = require("jsonwebtoken");
module.exports = async (ctx, config, { strapi }) => {
  // console.log(policyContext.state.user);

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    // if a session is open
    const token = ctx.request.header.authorization;
    const text = token.split('"')[1];
    console.log(text);
    //   if()
    const test = jwt.verify(
      text,
      "2b5b93233ca154bc4359d3ac83d1a64f",
      function (err, decoded) {
        // err
        if (err) {
          console.log("verify failed");
          return false;
        } else {
          console.log("verified");
          return true;
        }
        // decoded undefined
      }
    );
    if (test == true) {
      return true;
    } else {
      return false;
    }
    // go to next policy or reach the controller's action
  } else {
    console.log("verify failed..");
    return false;
  }

  // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
