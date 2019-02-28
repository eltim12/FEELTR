'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    photoUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Photo.associate = function (models) {
    // associations can be defined here
    Photo.belongsTo(models.User)
    Photo.belongsToMany(models.Tag, { through: models.PhotoTag })
  };
  return Photo;
};