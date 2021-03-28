const api = require("./api");
const register = require("./register");
const loginRoute = require("./login");
const logout = require("./logout");
const check = require("./check");

module.exports = (app) => {
  app.use("/api", api);
  app.use("/login", loginRoute);
  app.use("/register", register);
  app.use("/logout", logout);
  app.use("/check", check);
};
