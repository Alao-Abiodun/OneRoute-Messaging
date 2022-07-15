"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messaging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messaging.init(
    {
      messageId: DataTypes.STRING,
      message: DataTypes.STRING,
      sender: DataTypes.STRING,
      reciever: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Messaging",
      timestamps: true,
    }
  );
  return Messaging;
};
