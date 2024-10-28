const axios = require('axios');

const getYoutubeChannelData = async (req, res) => {
    try {
        const channelIdOrHandle = req.params.channelId;
        const apiKey = process.env.YOUTUBE_API_KEY;

        let channelId = channelIdOrHandle;

        // If the input is a handle (starts with '@'), resolve it to a channel ID
        if (channelIdOrHandle.startsWith('@')) {
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelIdOrHandle}&key=${apiKey}`;
            const searchResponse = await axios.get(searchUrl);

            if (searchResponse.data.items.length > 0) {
                channelId = searchResponse.data.items[0].snippet.channelId;
            } else {
                return res.status(404).json({ message: 'Channel not found' });
            }
        }

        // Now fetch the channel data with the resolved channel ID
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.items.length === 0) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        const snippet = response.data.items[0].snippet;
        const statistics = response.data.items[0].statistics;

        res.status(200).json({
            channelName: snippet.title,
            description: snippet.description,
            thumbnail: snippet.thumbnails.default.url,
            publishedAt: snippet.publishedAt,
            country: snippet.country || 'N/A',
            subscribers: statistics.subscriberCount,
            views: statistics.viewCount,
            videos: statistics.videoCount,
        });
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        res.status(500).json({ message: 'Error fetching YouTube data', error });
    }
};

module.exports = { getYoutubeChannelData };
