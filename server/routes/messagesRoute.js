const { getMsg , addmsg } = require("../controllers/messageController");

const router = require("express").Router();



router.post("/addmsg", addmsg)
router.post("/getmsg", getMsg);
module.exports = router;