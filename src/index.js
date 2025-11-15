/**
 * Main entry point for the application
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Middleware
app.use(express.json({ limit: '50mb' })); // For parsing JSON bodies with base64 images
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    message: 'The boulder rolls uphill! Keep pushing! 🪨',
    timestamp: new Date().toISOString(),
    status: 'active'
  });
});

// Task validation endpoint
app.post('/api/validate-task', async (req, res) => {
  try {
    const { images, taskDescription } = req.body;
    console.log('Received task validation request with', images?.length || 0, 'images');
    console.log('Task Description:', taskDescription);

    if (!images || !Array.isArray(images) || images.length === 0 || !taskDescription) {
      return res.status(400).json({
        success: false,
        explanation: 'Missing images or task description'
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        explanation: 'Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable.'
      });
    }

    // Build content array with text prompt and all images
    const content = [
      {
        type: 'text',
        text: `You are a task validator for a productivity app called Sisyphus.
The user is supposed to be working on the following task: "${taskDescription}"

The user has submitted ${images.length} image(s) for validation. Analyze the images to determine if the person appears to be working on or has completed this task.

Guidelines (standard strictness):
- Look for reasonable evidence of task engagement (relevant materials, work environment, tools/devices being used for the task)
- The person doesn't need to be perfectly focused - normal behavior like taking breaks, looking away, or relaxed posture is fine
- PASS if you can see indicators that suggest they're working on the task, even if not perfectly captured
- FAIL if the images clearly show unrelated activities (gaming, watching entertainment, socializing unrelated to task) or no connection to the task
- If multiple images are provided, consider them together - even one image showing task work is enough to PASS
- Give benefit of the doubt for ambiguous cases where work could reasonably be happening off-camera or between shots

Respond in JSON format with:
{
  "success": true/false,
  "explanation": "Brief explanation of why they passed or failed (1-2 sentences)"
}

Only respond with the JSON, nothing else.`
      }
    ];

    // Add all images to content array
    images.forEach((image, index) => {
      // Extract base64 data from data URL
      const base64Data = image.split(',')[1];
      const mediaType = image.split(';')[0].split(':')[1];

      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data
        }
      });
    });

    // Call Claude API to validate the task
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: content
        }
      ]
    });
    //const responseText = '{"success": "true", "explanation":"this is a test message."}';

    // Parse Claude's response
    const responseText = message.content[0].text;
    let validationResult;

    try {
      // Try to parse as JSON
      validationResult = JSON.parse(responseText);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        validationResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: assume failure if we can't parse
        validationResult = {
          success: false,
          explanation: 'Unable to validate the task. Please try again.'
        };
      }
    }

    res.json(validationResult);

  } catch (error) {
    console.error('Error validating task:', error);
    res.status(500).json({
      success: false,
      explanation: 'An error occurred while validating the task. Please try again.'
    });
  }
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
