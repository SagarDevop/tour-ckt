import { setServers } from 'node:dns/promises';
import {app} from './app.js';
import connectDB from './config/db.js';
import startSelfPing from './utils/ping.js';

// Fix for MongoDB Atlas ECONNREFUSED error on some networks/Windows
try {
  setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
  console.warn("Could not set DNS servers, continuing with defaults", error);
}

const PORT = process.env.PORT || 8080;


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        // Keep-alive for Render free tier
        const url_to_ping = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
        startSelfPing(url_to_ping);
    });
})
.catch((error) => {
    console.error("Failed to connect to DB", error);
});