const { getDB } = require('../config/db');
const { ObjectId } = require('bson');

class News {

    static collection() {
        return getDB().collection('news');
    }


    static async ensureIndexes() {
        await this.collection().createIndex(
            { title: 1 },
            { unique: true }
        );
    }

    static async create(news) {
        try {
            return await this.collection().insertOne({
                title: news.title,
                date: news.date,
                likes: 0
            });
        } catch (err) {
            if (err.code === 11000) return null;
            throw err;
        }
    }



    static async find(filter = {}, options = {}) {
        const {
            skip = 0,
            limit = 10,
            sort = { date: -1 }
        } = options;

        return await this.collection()
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray();
    }


    static async incrementLike(id) {
        const result = await this.collection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { likes: 1 } },
            { returnDocument: 'after' }
        );

        return result.value;
    }
}

module.exports = News;
