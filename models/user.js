const crypto = require('crypto');
const dotenv = require('dotenv').config();

function cryptPassword(password, callback) {
    crypto.DEFAULT_ENCODING = 'hex';
    crypto.pbkdf2(password, process.env.PBKDF2_SALT, parseInt(process.env.PBKDF2_ITERATIONS), 64, 'sha512', (err, derivedKey) => {
        return callback(err, derivedKey);
    });
}

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      firstName: {
          type: DataTypes.STRING,
          allowNull: true
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: true
      }
    });

    User.beforeCreate(function(model, options) {    
        return new Promise ((resolve, reject) => {
            cryptPassword(model.password, function(err, encrypted) {
                if (err) return reject(err);
                model.password = encrypted;
                return resolve(model, options);
            });
        });
    });

    return User;
  };