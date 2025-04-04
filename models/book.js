'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    author: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author is required'
        }
      }
    },
    genre: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Genre is required'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Year is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};