const express = require('express');
const router = express.Router();
const { addLike } = require('../controllers/like');

router.post('/:id', addLike);

module.exports = router;
