/**
 * Smart Society Management - Root Server Entry Wrapper
 * Preserves backwards compatibility for local execution (node server.js)
 */
const app = require('./api/index.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Smart Society API Server is running locally at http://localhost:${PORT}`);
});
