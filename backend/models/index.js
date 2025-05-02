// import sequelize from '../config/database.js';
// import User from './user.js';
// import Order from './order.js';
// import Product from './product.js';
// import OrderProducts from './orderProducts.js'; 
// import ProductReview from './productReview.js';  // Add this line if needed

// // User and Order (One-to-Many)
// User.hasMany(Order, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE',
// });
// Order.belongsTo(User, {
//   foreignKey: 'userId',
// });

// // Product and ProductReview (One-to-Many)
// Product.hasMany(ProductReview, {
//   foreignKey: 'productId',
//   as: 'reviews',
// });
// ProductReview.belongsTo(Product, {
//   foreignKey: 'productId',
// });

// // User and ProductReview (One-to-Many)
// User.hasMany(ProductReview, {
//   foreignKey: 'userId',
// });
// ProductReview.belongsTo(User, {
//   foreignKey: 'userId',
// });

// // Order and Product (Many-to-Many via OrderProducts)
// Order.belongsToMany(Product, {
//   through: OrderProducts, // Many-to-many join table
//   foreignKey: 'orderId',
//   as: 'products',
// });
// Product.belongsToMany(Order, {
//   through: OrderProducts,
//   foreignKey: 'productId',
// });

// export {
//   sequelize,
//   User,
//   Order,
//   Product,
//   OrderProducts,
//   ProductReview,
// };










import sequelize from '../config/database.js';
import User from './user.js';
import Product from './product.js';
import Order from './order.js';
import OrderProducts from './orderProducts.js';

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, {
  through: OrderProducts,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products',
});
Product.belongsToMany(Order, {
  through: OrderProducts,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders',
});

export {
  sequelize,
  User,
  Product,
  Order,
  OrderProducts,
};
