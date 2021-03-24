require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

const mountRoutes = require("./routes/index");
mountRoutes(app);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the panda API</h1>");
});

app.listen(port, () => console.log(`listening on port ${port}`));
