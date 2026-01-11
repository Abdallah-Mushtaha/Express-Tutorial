const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://engaboodmushtaha_db_user:6wRFanFtCjNG0Ve2@cluster0.ndktgbt.mongodb.net/GazaNews?appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectDB() {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
}

function getDB() {
    if (!db) throw new Error("Database not connected");
    return db;
}

module.exports = { connectDB, getDB };
