const db = require("../db/index");
const router = require("express-promise-router")();
const crypto = require("crypto");
const sha256 = require("./crypto");

module.exports = router;

router.post("/", async (req, res) => {
  const cookie = req.cookies.session_id;
  if (!cookie) {
    const { body } = req;
    try {
      const {
        rows,
      } = await db.query("SELECT password, salt FROM users WHERE email=$1", [
        body.email,
      ]);

      if (rows.length == 0) {
        res.json({ creds: false });
      }

      const saltedPass = sha256(body.password + rows[0].salt);

      if (saltedPass === rows[0].password) {
        const session_id = randomString();
        await db.query("UPDATE sessions SET sessionid=$1 WHERE email=$2", [
          session_id,
          body.email,
        ]);
        res
          .cookie("session_id", session_id, { httpOnly: true })
          .json({ msg: `${body.email} Authenticated and Logged In` });
        console.log(`${body.email} is authenticated`);
      } else {
        res.json({ creds: false });
      }
    } catch (err) {
      console.log("error in login.js");
      res.send("error");
    }
  } else {
    console.log("already logged in");
    res.send("already logged in");
  }
});

function randomString() {
  return crypto.randomBytes(64).toString("hex");
}
