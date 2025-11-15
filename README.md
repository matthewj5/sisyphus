# Sisyphus
Making hard deadlines

A productivity app that uses camera validation with Claude AI to ensure you're actually working on your tasks. If you fail to prove you're working, you go to hell.

## Features

- Task timer with sequential task management
- Camera-based task validation using Claude AI
- Questionnaire system
- Strict accountability (no pausing, no going back!)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your Claude API key:
   - Copy `.env.example` to `.env`
   - Get your API key from https://console.anthropic.com/
   - Add your API key to `.env`:
     ```
     ANTHROPIC_API_KEY=your_actual_api_key_here
     ```

3. Run the server:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## How It Works

1. Complete the questionnaire (first time only)
2. Add your tasks with durations
3. Start working!
4. When each task timer completes, you must take a photo proving you're working
5. Claude AI analyzes the photo to verify you're actually working on the task
6. If validation passes, continue to the next task
7. If validation fails, you go to hell and start over

## Camera Permissions

The app requires camera access to validate your work. Make sure to grant camera permissions when prompted by your browser.
