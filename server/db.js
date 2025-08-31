// db.js
const { MongoClient } = require('mongodb');
require("dotenv").config();

const uri = process.env.MONGODB_URI; 

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const client = new MongoClient(uri, {
  tls: true,
  serverSelectionTimeoutMS: 5000, // быстрее падать при ошибке
});
let db;

async function connectToMongo() {
  if (!db) {
    try{
      await client.connect();
      db = client.db("calculator");
    }catch(e){
      console.log("Mongo connection error:", e)
      throw e
    }
    
  }
  return db;
}
console.log('MONGODB_URI:', process.env.MONGODB_URI);

module.exports = connectToMongo;
