// db.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

let db;

async function connectToMongo() {
  if (!db) {
    await client.connect();
    db = client.db('calculator'); // 👉 замени на своё имя БД
  }
  return db;
}
console.log('MONGODB_URI:', process.env.MONGODB_URI);

module.exports = connectToMongo;
