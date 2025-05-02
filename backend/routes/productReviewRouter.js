// import express from 'express';
// import { addProductReview, getProductReviews } from '../controllers/productReviewController.js';

// const productReviewRouter = express.Router();

// productReviewRouter.post('/add', addProductReview);
// productReviewRouter.get('/:productId', getProductReviews);

// export default productReviewRouter;


// import express from 'express';
// import { addProductReview, getProductReviews } from '../controllers/productReviewController.js';
// import authUser from '../middleware/auth.js';

// const productReviewRouter = express.Router();

// productReviewRouter.post('/review/:productId', authUser, addProductReview);
// productReviewRouter.get('/:productId', getProductReviews);



// export default productReviewRouter;











import express from 'express';
import { addProductReview, getProductReviews } from '../controllers/productReviewController.js';
import authUser from '../middleware/auth.js';

const productReviewRouter = express.Router();

// Route: POST /api/review/:productId
productReviewRouter.post('/:productId', authUser, addProductReview);

// Route: GET /api/review/:productId
productReviewRouter.get('/:productId', getProductReviews);

export default productReviewRouter;
