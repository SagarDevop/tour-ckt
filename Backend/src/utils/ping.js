import axios from 'axios';

/**
 * Pings the server periodically to keep it from sleeping on Render free tier.
 * Render free tier goes to sleep after 15 minutes of inactivity.
 * This function pings the server every 14 minutes.
 * @param {string} url - The URL of the server to ping.
 */
const startSelfPing = (url) => {
    if (!url) {
        console.warn("Self-ping: No URL provided, skipping self-ping.");
        return;
    }

    console.log(`Self-ping: Starting pinger for ${url}`);

    // Ping every 14 minutes
    const interval = 14 * 60 * 1000;

    setInterval(async () => {
        try {
            console.log(`Self-ping: Pinging ${url}...`);
            const response = await axios.get(url);
            console.log(`Self-ping: Success! Status: ${response.status}`);
        } catch (error) {
            console.error(`Self-ping: Failed to ping ${url}. Error: ${error.message}`);
        }
    }, interval);
};

export default startSelfPing;
