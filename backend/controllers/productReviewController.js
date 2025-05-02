import { sequelize, User, Product, Order, ProductReview } from '../models/index.js';

// Add Product Review
// const addProductReview = async (req, res) => {
//   try {
//     const { productId, userId, name, reviewMessage, reviewValue } = req.body;

//     // Check if the user has purchased the product
//     const order = await Order.findOne({
//       where: {
//         userId,
//       },
//       include: [{
//         model: Product,
//         as: 'products',
//         where: {
//           id: productId,
//         },
//       }],
//     });

//     if (!order) {
//       return res.status(403).json({
//         success: false,
//         message: "You need to purchase the product to review it.",
//       });
//     }

//     // Check if the user has already reviewed the product
//     const existingReview = await ProductReview.findOne({
//       where: { productId, userId },
//     });

//     if (existingReview) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this product!",
//       });
//     }

//     // Add the new review
//     const newReview = await ProductReview.create({
//       productId,
//       userId,
//       name,
//       reviewMessage,
//       reviewValue,
//     });

//     const reviews = await ProductReview.findAll({ where: { productId } });
//     const totalReviews = reviews.length;
//     const averageReview = reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews;

//     await Product.update(
//       { averageReview },
//       { where: { id: productId } }
//     );

//     res.status(201).json({
//       success: true,
//       data: newReview,
//     });

//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occurred while adding review",
//     });
//   }
// };





const addProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, name, reviewMessage, reviewValue } = req.body;

    const order = await Order.findOne({
      where: { userId },
      include: [{
        model: Product,
        as: 'products',
        where: { id: productId },
        required: true, // Important to ensure the join works
      }],
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase the product to review it.",
      });
    }

    const existingReview = await ProductReview.findOne({
      where: { productId, userId },
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    const newReview = await ProductReview.create({
      productId,
      userId,
      name,
      reviewMessage,
      reviewValue,
    });

    const reviews = await ProductReview.findAll({ where: { productId } });
    const totalReviews = reviews.length;
    const averageReview = reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews;

    await Product.update(
      { averageReview },
      { where: { id: productId } }
    );

    res.status(201).json({
      success: true,
      data: newReview,
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding review",
    });
  }
};


const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const reviews = await ProductReview.findAll({
      where: { productId },
      include: [{ model: User, attributes: ['id', 'name'] }],
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching reviews",
    });
  }
};

export { addProductReview, getProductReviews };
