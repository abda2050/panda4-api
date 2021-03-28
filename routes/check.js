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
    console.log(rows[0].email);
    res.send("Look at console");
  } catch (err) {
    console.log(err);
    res.send("Error: look at console");
  }
});
