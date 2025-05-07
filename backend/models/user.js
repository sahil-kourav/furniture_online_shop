import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  mobileNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      is: /^[6-9]\d{9}$/,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cartData: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  }
}, {
  tableName: 'users',
  timestamps: false, 
});

export default User;
