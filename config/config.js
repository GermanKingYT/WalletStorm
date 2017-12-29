const dotenv = require('dotenv').config();

module.exports = {
  "development": {
    "database": process.env.DB_DEV_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "pool": {
      "max": "100",
      "min": "0",
      "idle": "1000",
      "handleDisconnects": "true"
    }
  },
  "production": {
    "database": process.env.DB_PROD_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "pool": {
      "max": "100",
      "min": "0",
      "idle": "1000",
      "handleDisconnects": "true"
    }
  },
  "travis": {
    "database": process.env.DB_PROD_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "pool": {
      "max": "100",
      "min": "0",
      "idle": "1000",
      "handleDisconnects": "true"
    }
  }
}