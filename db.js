require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;
const url = process.env.DB_URL;

/**
 * Connects to the database and sets the 'db' variable to the mongo client db.
 */
async function connectToDb() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db();
}

/**
 * Returns the mongo client db
 */
function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
