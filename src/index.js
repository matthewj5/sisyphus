/**
 * Main entry point for the application
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    message: 'The boulder rolls uphill! Keep pushing! 🪨',
    timestamp: new Date().toISOString(),
    status: 'active'
  });
});

// Start server
function main() {
  app.listen(PORT, () => {
    console.log(`🪨 Sisyphus is running at http://localhost:${PORT}`);
    console.log('Making hard deadlines...');
  });
}

// Run the main function
main();

// Export for testing
module.exports = { app, main };
