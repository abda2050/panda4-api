const db = require("../db/index");
const router = require("express-promise-router")();
const crypto = require("crypto");
const sha256 = require("./crypto");

module.exports = router;

const authPass = async (saltedPass, dbPass, body, res) => {
  if (saltedPass === dbPass) {
    const session_id = randomString();
    await db.query("UPDATE sessions SET sessionid=$1 WHERE email=$2", [
      session_id,
      body.email,
    ]);
    res.json({ session_id: session_id });
  } else {
    res.json({ creds: false, msg: "Incorrect password" });
  }
};

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const {
      rows,
    } = await db.query("SELECT password, salt FROM users WHERE email=$1", [
      body.email,
    ]);

    if (rows.length == 0) {
      res.json({ creds: false, msg: "incorrect email" });
    }

    const saltedPass = sha256(body.password + rows[0].salt);
    authPass(saltedPass, rows[0].password, body, res);
  } catch (err) {
    console.log("error in login.js");
    res.send("error");
  }
});

function randomString() {
  return crypto.randomBytes(64).toString("hex");
}
