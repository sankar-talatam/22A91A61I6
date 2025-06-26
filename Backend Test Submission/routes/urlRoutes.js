const express = require('express');
const router = express.Router();

const { createShortUrl, getStats } = require('../controllers/urlController');

router.post('/', createShortUrl);
router.get('/:shortcode', getStats);

module.exports = router;
