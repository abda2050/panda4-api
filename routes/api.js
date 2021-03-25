const db = require("../db/index");
const Router = require("express-promise-router");
const router = new Router();

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR 400: Bad Request");
  }
});
