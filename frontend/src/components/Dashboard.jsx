import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [channelUrl, setChannelUrl] = useState('');

    // Function to extract the channel ID from the YouTube URL
    const extractChannelId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:channel\/|user\/|c\/)?([^/]+)/);
        return match ? match[1] : null;
    };

    // Function to fetch channel data from the backend
    const fetchData = async (channelId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/youtube/channel/${channelId}`);
            setChannelData(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching data. Please check the YouTube channel URL.');
        } finally {
            setLoading(false);
        }
    };

    // Handle input field change
    const handleInputChange = (e) => {
        setChannelUrl(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const channelId = extractChannelId(channelUrl);
        
        if (channelId) {
            setLoading(true);
            fetchData(channelId);
        } else {
            setError('Invalid YouTube channel URL. Please enter a valid URL.');
        }
    };

    return (
        <div>
            <h1>YouTube Channel Analytics</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter YouTube Channel URL"
                    value={channelUrl}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Fetch Data</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {channelData && (
                <div style={{ marginTop: '20px' }}>
                    <img 
                        src={channelData.thumbnail} 
                        alt="Channel Thumbnail" 
                        style={{ width: '150px', borderRadius: '50%' }} 
                    />
                    <h2>{channelData.title}</h2>
                    <p><strong>Description:</strong> {channelData.description || 'N/A'}</p>
                    <p><strong>Published At:</strong> {new Date(channelData.publishedAt).toLocaleDateString() || 'N/A'}</p>
                    <p><strong>Country:</strong> {channelData.country || 'N/A'}</p>
                    <p><strong>Subscribers:</strong> {channelData.subscriberCount || 'N/A'}</p>
                    <p><strong>Views:</strong> {channelData.viewCount || 'N/A'}</p>
                    <p><strong>Videos:</strong> {channelData.videoCount || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
