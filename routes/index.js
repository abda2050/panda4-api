const api = require("./api");
const register = require("./register");

module.exports = (app) => {
  app.use("/api", api);
  app.use("/register", register);
};
