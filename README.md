# 🪨 Sisyphus - Making Hard Deadlines

A productivity accountability app that uses AI-powered task validation to keep you on track. If you fail to prove you're working, your ex gets notified. The boulder never stops rolling.

## 🏗️ Project Structure

This is a **monorepo** with separate frontend and backend:

```
sisyphus/
├── frontend/           # React + Vite + TypeScript + Tailwind v4
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # 5 main pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # Global state management
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript definitions
│   │   ├── data/         # Questionnaire data
│   │   └── utils/        # Helper functions
│   └── package.json
├── backend/            # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Claude API & Email
│   │   ├── middleware/   # Validation & error handling
│   │   ├── config/       # Environment config
│   │   └── types/        # TypeScript definitions
│   └── package.json
└── public/             # Original vanilla JS version (archived)
```

## ✨ Features

- **Simplified Questionnaire**: Collects your name and ex's email for accountability
- **Task Timer**: Create tasks with durations (MM:SS format), no pausing allowed
- **AI Validation**: Uses Claude Sonnet 4.5 to verify you're actually working via camera/photos
- **Accountability**: Fails send an email notification to your ex
- **Multi-Image Support**: Capture photos from webcam or upload images
- **TypeScript Throughout**: Full type safety in both frontend and backend
- **Modern Stack**: React 19, Vite 7, Tailwind v4, Express 5

## 🚀 Getting Started

### Prerequisites

- Node.js v22.12+ (or v20.19+)
- npm or yarn
- Claude API key from Anthropic
- Gmail app password (for email notifications)

### Environment Setup

1. **Backend Environment Variables**

Create `backend/.env`:

```env
# Required
ANTHROPIC_API_KEY=your_claude_api_key_here

# Optional (for email notifications)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Server port (optional, defaults to 3000)
PORT=3000
```

2. **Frontend Environment Variables**

Create `frontend/.env.local` (optional):

```env
VITE_API_URL=http://localhost:3000/api
```

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Development Mode (recommended):**

Open two terminal windows:

```bash
# Terminal 1 - Backend (runs on port 3000)
cd backend
npm run dev

# Terminal 2 - Frontend (runs on port 5173)
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

**Production Build:**

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm run preview
```

## 🎯 User Flow

1. **Loading Screen** → Animated Sisyphus pushing boulder (2s)
2. **Questionnaire** → Enter name + ex's email
3. **Timer Page** → Add tasks with durations, start timer
4. **Camera Page** → Timer ends, prove you were working
5. **Result**:
   - ✅ **Pass**: Return to timer for next task
   - ❌ **Fail**: Go to hell, ex gets notified

## 📦 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS v4** - Styling
- **React Context** - State management

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Zod** - Request validation
- **Anthropic Claude API** - AI task validation
- **Nodemailer** - Email notifications

## 🎨 Questionnaire Options

### Current: Simplified Version
- Only 2 questions (name + ex email)
- Quick onboarding
- Can be skipped

### Archived: Full Version
Located in `frontend/src/data/questionnaireData.full.ts`

40+ hilarious questions across 8 sections:
- Basic Contact Information
- Professional & Identity Verification
- Account Security Questions
- Social & Behavioral Analytics
- Consumer & Digital Behavior Profile
- Health and Emotional Intelligence Assessment
- Relationship History Assessment
- Comprehensive Background & Financial Verification

**To restore:** Copy sections from `.full.ts` back to `questionnaireData.ts`

## 📝 API Endpoints

### `GET /api/status`
Health check endpoint

**Response:**
```json
{
  "message": "The boulder rolls uphill! Keep pushing! 🪨",
  "timestamp": "2025-01-16T...",
  "status": "active"
}
```

### `POST /api/validate-task`
Validate task with Claude AI

**Request:**
```json
{
  "images": ["data:image/jpeg;base64,..."],
  "taskDescription": "Complete project documentation"
}
```

**Response:**
```json
{
  "success": true,
  "explanation": "User appears to be working on documentation with laptop visible"
}
```

### `POST /api/notify-hell`
Send failure notification

**Request:**
```json
{
  "exEmail": "ex@example.com",
  "userName": "John Doe",
  "reason": "Failed task validation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## 🔧 Development Commands

### Backend
```bash
npm run dev         # Start dev server with hot reload
npm run build       # Compile TypeScript
npm run start       # Run compiled code
npm run type-check  # Check TypeScript types
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📂 Key Files

### Frontend
- `src/App.tsx` - Main app with page routing
- `src/context/AppContext.tsx` - Global state management
- `src/hooks/useTimer.ts` - Timer logic
- `src/hooks/useCamera.ts` - Camera management
- `src/hooks/useImageCapture.ts` - Photo capture/upload
- `src/data/questionnaireData.ts` - Current questionnaire (2 questions)
- `src/data/questionnaireData.full.ts` - Archived full questionnaire

### Backend
- `src/index.ts` - Server entry point
- `src/app.ts` - Express app configuration
- `src/routes/index.ts` - API routes
- `src/services/claudeService.ts` - Claude AI integration
- `src/services/emailService.ts` - Email notifications
- `src/middleware/validators.ts` - Zod validation schemas

## 🎨 Styling

Uses Tailwind v4 with custom earth-tone theme:

```javascript
colors: {
  earth: {
    brown: '#a2836e',
    'muted-green': '#6e7f5e',
    sand: '#e5d9c5',
    'light-sand': '#f5f0e6',
    'dark-brown': '#3e2c19',
  }
}
```

Custom component classes:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-delete`
- `.form-input`, `.form-label`, `.form-textarea`, `.form-select`

## 🐛 Troubleshooting

**Build fails with "Vite requires Node.js version..."**
- Upgrade to Node.js v22.12+ or v20.19+

**Camera not working**
- Grant camera permissions in browser
- Check HTTPS (required for getUserMedia)
- Use `localhost` for development (HTTPS not needed)

**API calls fail with CORS errors**
- Ensure backend is running on port 3000
- Check Vite proxy configuration in `vite.config.ts`
- CORS is enabled in `backend/src/app.ts`

**Email not sending**
- Check Gmail App Password (not regular password)
- Enable "Less secure app access" in Gmail
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`

## 📄 License

ISC

## 🤝 Contributing

This is a personal project, but feel free to fork and modify!

---

**"One must imagine Sisyphus happy."** - Albert Camus
