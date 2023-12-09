const express = require("express");
const {
  addtrsnsaction,
  getalltrsnsaction,
  deleteTransection,
  editTransection,
} = require("../controllers/trsnsactionCtrl");

const router = express.Router();

router.post("/addtransaction", addtrsnsaction);
router.post("/gettransaction", getalltrsnsaction);
router.post("/delete-transection", deleteTransection);
router.post("/edit-transection", editTransection);

module.exports = router;
