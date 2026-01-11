const News = require('../modules/News');
const { success, error } = require('../utils/Response');

async function getNews(req, res) {
    try {
        const { page = 1, limit = 10, sort = 'desc', title, date } = req.query;
        const filter = {};
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (date) filter.date = date;

        const options = {
            skip: (page - 1) * limit,
            limit: parseInt(limit),
            sort: { date: sort === 'asc' ? 1 : -1 }
        };

        const news = await News.find(filter, options);
        res.json(success(news));
    } catch (err) {
        res.status(500).json(error(err.message));
    }
}

module.exports = { getNews };
