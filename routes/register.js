const db = require("../db/index");
const router = require("express-promise-router")();
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

module.exports = router;

router.post("/", async (req, res) => {
  const { body } = req;
  const salt = uuidv4();
  const saltedPass = sha256(body.password + salt);
  try {
    await db.query(
      "INSERT INTO users (name, email, role, password, salt) VALUES ($1, $2, $3, $4, $5)",
      [body.name, body.email, body.role, saltedPass, salt]
    );
    res.send("query made successfully");
  } catch (err) {
    res.send(`error: ${err}`);
  }
});

function sha256(txt) {
  const secret = process.env.SHA_SECRET;
  const hash = crypto.createHmac("sha256", secret).update(txt).digest("hex");
  return hash;
}
