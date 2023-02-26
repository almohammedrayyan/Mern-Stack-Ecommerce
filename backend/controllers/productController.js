const Product = require("../models/productModel");
const ErrorHandling = require("../utils/errorHandlig");
const catchError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeature");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
//create product

exports.createProduct = catchError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images?.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks?.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//getAllProduct

exports.getAllProducts = catchError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//update product
exports.updateProduct = catchError(async (req, res, next) => {
  let updateProduct = Product.findById(req.params.id);
  if (!updateProduct) {
    return next(new ErrorHandling("Product not found", 404));
  }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < updateProduct?.images?.length; i++) {
      await cloudinary.v2.uploader.destroy(updateProduct?.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images?.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks?.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    updateProduct,
  });
});
//delete product

exports.deleteProduct = catchError(async (req, res, next) => {
  const deleteProduct = await Product.findById(req.params.id);
  if (!deleteProduct) {
    return next(new ErrorHandling("Product not found", 404));
  }
  // Deleting Images From Cloudinary
  for (let i = 0; i < deleteProduct.images.length; i++) {
    await cloudinary.v2.uploader.destroy(deleteProduct.images[i].public_id);
  }
  await deleteProduct.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Sucessfully",
  });
});

///get product details

exports.getProductDetails = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // console.log(product);

  if (!product) {
    return next(new ErrorHandling("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//create  new review or update the review

exports.createProductReview = catchError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user?.toString() === req.user._id?.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user?.toString() === req.user._id?.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product?.reviews?.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateforSave: false });

  res.status(200).json({
    success: true,
  });
});

///get All Product review

exports.getProductReviews = catchError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandling("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delte a review

exports.deleteReviews = catchError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandling("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / product.reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    message: `Review Deleted Successfully`,
  });
});

//get admin products
exports.getAdminProducts = catchError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
