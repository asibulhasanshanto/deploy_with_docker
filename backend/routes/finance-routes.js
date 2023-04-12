const express = require("express");
const { protect, restrictTo } = require("../middlewares/auth-middleware");
const financeController = require("../controllers/finance-cotroller");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(financeController.getAllFinances)
  .post(financeController.createNewFinance);

router.route("/:id").delete(financeController.deleteFinance);

module.exports = router;
