import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductReview = sequelize.define('ProductReview', {
  id: {
    type: DataTypes.UUID, // Keep UUID here to match Product model
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID, // UUID type to match Product model
    allowNull: false,
  },
  userId: {
    type: DataTypes.CHAR(36),  // Change to CHAR(36) to match User model
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewMessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  tableName: 'product_reviews',
  timestamps: true,
});

export default ProductReview;
