'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as : 'rol',
        foreignKey : 'idRol'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    idRol: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    validate: DataTypes.BOOLEAN,
    lock: DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};