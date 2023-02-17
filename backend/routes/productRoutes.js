const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getProductDetails,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
