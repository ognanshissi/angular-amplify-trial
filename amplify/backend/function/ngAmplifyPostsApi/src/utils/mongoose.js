'use strict';

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || 'mongodb+srv://boxtrackAdmin:0nWYnPafeiA4D6Ge@dev-cluster.cxrhz.mongodb.net/ng-amplify-post-db?retryWrites=true&w=majority';

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
