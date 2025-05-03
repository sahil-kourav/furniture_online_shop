// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     cartData: { type: Object, default: {} }
// }, { minimize: false })

// const userModel = mongoose.models.user || mongoose.model('user',userSchema);

// export default userModel





















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
    // unique: true, 
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
