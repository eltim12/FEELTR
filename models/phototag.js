'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define('PhotoTag', {
    PhotoId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  PhotoTag.associate = function(models) {
    // associations can be defined here
    PhotoTag.belongsTo(models.Photo)
    PhotoTag.belongsTo(models.Tag)
  };
  return PhotoTag;
};