const News = require('../modules/News');
const { success, error } = require('../utils/Response');

async function addLike(req, res) {
    try {
        const { id } = req.params;
        const updated = await News.incrementLike(id);
        if (!updated) return res.status(404).json(error('News not found'));
        res.json(success(updated, 'Like added'));
    } catch (err) {
        res.status(500).json(error(err.message));
    }
}

module.exports = { addLike };
