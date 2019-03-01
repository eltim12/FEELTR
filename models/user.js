'use strict';

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('../helpers/encrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill in the required fields."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill in the required fields."
        },
        isUnique(input) {
          return User
            .findOne({
              where: {
                username: input,
                id: {
                  [Op.ne]: this.id
                }
              }
            })
            .then(dataFound => {
              if(dataFound) {
                throw new Error("Username already taken, please choose another username.")
              }
            })
            .catch(err => {
              throw err
            })
        }
      }
    },  
    password: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill in the required fields."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true, 
          msg: "Please fill in the required fields."
        },
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address.'
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
            .then(function (data) {
              if (data !== null) {
                throw new Error(`duplicated email`)
              }
            })
            .catch(function (err) {
              throw err
            })
        }
      }
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Photo)
  };

  User.beforeCreate((user,options) => {
    user.password = bcrypt.encrypt(user.password)
  })

  User.beforeUpdate((user,options) => {
    user.password = bcrypt.encrypt(user.password)
  })

  return User;
};