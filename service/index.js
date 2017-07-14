const { applyMiddleware } = require("micro-middleware");
const { validate } = require("../lib/validate-email");

async function service(req, res) {
  const email = req.url.substr(1);

  try {
    return { email, is_valid: await validate(email) };
  } catch (err) {
    return { email, is_valid: false, message: err.message };
  }
}

module.exports = applyMiddleware(service, [
  require("micro-cors")(),
  require("micro-compress")
]);
