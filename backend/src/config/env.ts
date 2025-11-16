import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  ANTHROPIC_API_KEY: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = {
  PORT: parseInt(parsed.data.PORT, 10),
  ANTHROPIC_API_KEY: parsed.data.ANTHROPIC_API_KEY,
  EMAIL_USER: parsed.data.EMAIL_USER,
  EMAIL_PASSWORD: parsed.data.EMAIL_PASSWORD,
  isEmailConfigured: !!(parsed.data.EMAIL_USER && parsed.data.EMAIL_PASSWORD),
  isClaudeConfigured: !!parsed.data.ANTHROPIC_API_KEY,
};
