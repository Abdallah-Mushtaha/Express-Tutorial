const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/News');

router.get('/', getNews);

module.exports = router;
