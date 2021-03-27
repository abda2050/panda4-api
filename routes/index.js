const api = require("./api");
const register = require("./register");
const loginRoute = require("./login");

module.exports = (app) => {
  app.use("/api", api);
  app.use("/login", loginRoute);
  app.use("/register", register);
};
