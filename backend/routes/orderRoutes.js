const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getMyOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/authentication");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
module.exports = router;
