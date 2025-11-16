/**
 * Main entry point for the application
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Initialize email transporter only if credentials are provided
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    }
  });
  console.log('📧 Email notifications enabled');
} else {
  console.log('📧 Email notifications disabled (no credentials configured)');
}

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

// Email notification endpoint for hell
app.post('/api/notify-hell', async (req, res) => {
  try {
    const { exEmail, userName, reason } = req.body;

    if (!exEmail || !userName || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email not configured, skipping notification');
      return res.json({
        success: true,
        message: 'Email notification skipped (not configured)'
      });
    }

    // Send email to ex
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: exEmail,
      subject: '🔥 Your Ex Just Failed at Productivity',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ff6b6b;">
          <h1 style="color: #ff3838; text-align: center;">🔥 SISYPHUS PRODUCTIVITY ALERT 🔥</h1>
          
          <div style="background-color: #2d2d2d; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #ff6b6b;">They Failed. Again.</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Remember <strong>${userName}</strong>? Yeah, that person you used to know.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Well, they just got sent to productivity hell because:
            </p>
            <blockquote style="background-color: #3d3d3d; padding: 15px; border-left: 4px solid #ff3838; margin: 20px 0;">
              <em style="color: #ffaa00;">"${reason}"</em>
            </blockquote>
            <p style="font-size: 16px; line-height: 1.6;">
              The boulder has rolled back down the hill. Again.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; color: #ffaa00;">
              You made the right choice. 👍
            </p>
          </div>

          <hr style="border: 1px solid #3d3d3d; margin: 30px 0;">

          <p style="font-size: 12px; color: #888; text-align: center;">
            This notification was sent by Sisyphus Productivity App<br>
            Making Hard Deadlines Since Forever<br>
            <em>The boulder never stops rolling</em>
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email'
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
