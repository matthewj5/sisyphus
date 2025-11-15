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
app.use(express.json({ limit: '10mb' })); // For parsing JSON bodies with base64 images
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
    const { image, taskDescription } = req.body;
    console.log('Received task validation request1');
    if (!image || !taskDescription) {
      return res.status(400).json({
        success: false,
        explanation: 'Missing image or task description'
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        explanation: 'Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable.'
      });
    }

    // Extract base64 data from data URL
    const base64Data = image.split(',')[1];
    const mediaType = image.split(';')[0].split(':')[1];

    // Call Claude API to validate the task
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data
              }
            },
            {
              type: 'text',
              text: `You are a strict task validator for a productivity app called Sisyphus. The user is supposed to be working on the following task: "${taskDescription}"

Analyze the image provided and determine if the person appears to be actually working on this task.

Rules:
- Look for evidence they are genuinely working (computer screen with relevant content, tools, materials related to the task, etc.)
- If the image shows them distracted, on social media, watching videos unrelated to the task, or clearly not working, they FAIL
- If there's no clear evidence they're working on the specific task, they FAIL
- Be strict but fair - if they appear to be making a genuine effort on the task, they PASS

Respond in JSON format with:
{
  "success": true/false,
  "explanation": "Brief explanation of why they passed or failed (1-2 sentences)"
}

Only respond with the JSON, nothing else.`
            }
          ]
        }
      ]
    });

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
