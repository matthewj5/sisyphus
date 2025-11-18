import Anthropic from '@anthropic-ai/sdk';
import type { TextBlockParam, ImageBlockParam } from '@anthropic-ai/sdk/resources/messages.js';
import { env } from '../config/env.js';
import type { ValidationResponse, ClaudeMediaType } from '../types/index.js';

let anthropic: Anthropic | null = null;

if (env.isClaudeConfigured) {
  anthropic = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY!,
  });
}

export async function validateTask(
  images: string[],
  taskDescription: string
): Promise<ValidationResponse> {
  if (!anthropic || !env.ANTHROPIC_API_KEY) {
    throw new Error('Claude API key not configured');
  }

  // Build content array with text prompt and all images
  const content: (TextBlockParam | ImageBlockParam)[] = [
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

Only respond with the JSON, nothing else.`,
    },
  ];

  // Add all images to content array
  images.forEach((image) => {
    // Extract base64 data from data URL
    const base64Data = image.split(',')[1];
    const mediaType = image.split(';')[0].split(':')[1] as ClaudeMediaType;

    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: mediaType,
        data: base64Data,
      },
    });
  });

  // Call Claude API to validate the task
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  });

  // Parse Claude's response
  const firstBlock = message.content[0];
  if (firstBlock.type !== 'text') {
    throw new Error('Unexpected response format from Claude');
  }
  const responseText = firstBlock.text;
  let validationResult: ValidationResponse;

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
        explanation: 'Unable to validate the task. Please try again.',
      };
    }
  }

  return validationResult;
}
