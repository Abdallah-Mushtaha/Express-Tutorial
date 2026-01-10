import { MongoClient } from "mongodb";

const _uri = "mongodb+srv://engaboodmushtaha_db_user:6wRFanFtCjNG0Ve2@cluster0.ndktgbt.mongodb.net/?appName=Cluster0";

const DBConiction = async (collection, cb) => {
    const client = new MongoClient(_uri);

    try {
        await client.connect();
        const db = client.db("userDB").collection(collection);
        await cb(db);

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
};

export default DBConiction;