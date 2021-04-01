const db = require("../db/index");
const router = require("express-promise-router")();

module.exports = router;

router.post("/", async (req, res) => {
  const session_id = req.body.session_id;
  try {
    const {
      rows,
    } = await db.query("SELECT email FROM sessions WHERE sessionid=$1", [
      session_id,
    ]);
    if (rows.length == 0) {
      res.json({ msg: false });
    } else {
      res.json({ email: rows[0].email });
    }
  } catch (err) {
    console.log(err);
    res.json({ msg: "error" });
  }
});
