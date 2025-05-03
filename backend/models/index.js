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
