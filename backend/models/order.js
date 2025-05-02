import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; 

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  userId: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Order Placed',
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.ENUM('Pending', 'Paid'),
    allowNull: false,
    defaultValue: 'Pending',
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

export default Order;
