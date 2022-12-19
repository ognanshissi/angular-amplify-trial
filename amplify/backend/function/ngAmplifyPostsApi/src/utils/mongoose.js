'use strict';

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI

let connection;
const connect = async () => {
  try {
    connection = await mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
