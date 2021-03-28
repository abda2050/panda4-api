const db = require("../db/index");
const router = require("express-promise-router")();

module.exports = router;

router.post("/", async (req, res) => {
  const session_id = req.body.session_id;
  if (session_id) {
    try {
      await db.query("UPDATE sessions SET sessionid=NULL WHERE sessionid=$1", [
        session_id,
      ]);
      res.json({ msg: "deleted session from db" });
    } catch (err) {
      res.json({ error: err });
    }
  } else {
    console.log("failed");
  }
});
