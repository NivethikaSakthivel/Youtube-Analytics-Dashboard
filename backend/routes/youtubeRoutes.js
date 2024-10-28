const express = require('express');
const router = express.Router();
const { getYoutubeChannelData } = require('../controllers/youtubeControllers');

router.get('/channel/:channelId', getYoutubeChannelData);

module.exports = router;
