// Task types
export interface Task {
  id: number;
  text: string;
  duration: number; // in seconds
  completed: boolean;
}

// Image types
export interface CapturedImage {
  type: 'camera' | 'upload';
  data: string; // base64 data URL
  timestamp: number;
  filename?: string;
}

// Questionnaire types
export interface QuestionnaireResponse {
  [key: string]: string; // key format: sectionId_questionId
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'email';
  required: boolean;
  placeholder?: string;
  options?: QuestionOption[];
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// API types
export interface ValidationResponse {
  success: boolean;
  explanation: string;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
}

// Page types
export type PageId = 'loading' | 'questionnaire' | 'timer' | 'camera' | 'hell';

// App state types
export interface TimerState {
  tasks: Task[];
  currentTaskIndex: number;
  timeRemaining: number;
  timerStarted: boolean;
  timerInterval: number | null;
}

export interface CameraState {
  cameraStream: MediaStream | null;
  capturedImages: CapturedImage[];
}

export interface QuestionnaireState {
  currentSectionIndex: number;
  formResponses: QuestionnaireResponse;
  questionnaireCompleted: boolean;
}
