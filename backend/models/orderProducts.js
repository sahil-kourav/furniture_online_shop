import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderProducts = sequelize.define('OrderProducts', {
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'order_products',
  timestamps: false,
});

export default OrderProducts;
