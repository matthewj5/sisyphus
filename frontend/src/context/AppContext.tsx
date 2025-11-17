import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  Task,
  CapturedImage,
  QuestionnaireResponse,
  PageId,
  TimerState,
  CameraState,
  QuestionnaireState,
} from '../types';

interface AppState {
  // Page management
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;

  // Timer state
  timer: TimerState;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  setCurrentTaskIndex: (index: number) => void;
  setTimeRemaining: (time: number) => void;
  setTimerStarted: (started: boolean) => void;
  setTimerInterval: (interval: number | null) => void;

  // Camera state
  camera: CameraState;
  setCameraStream: (stream: MediaStream | null) => void;
  setCapturedImages: (images: CapturedImage[]) => void;
  addCapturedImage: (image: CapturedImage) => void;
  removeCapturedImage: (index: number) => void;
  clearCapturedImages: () => void;

  // Questionnaire state
  questionnaire: QuestionnaireState;
  setCurrentSectionIndex: (index: number) => void;
  setFormResponses: (responses: QuestionnaireResponse) => void;
  updateFormResponse: (key: string, value: string) => void;
  setQuestionnaireCompleted: (completed: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Page state
  const [currentPage, setCurrentPage] = useState<PageId>('loading');

  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    tasks: [],
    currentTaskIndex: 0,
    timeRemaining: 0,
    timerStarted: false,
    timerInterval: null,
  });

  // Camera state
  const [camera, setCamera] = useState<CameraState>({
    cameraStream: null,
    capturedImages: [],
  });

  // Questionnaire state
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireState>({
    currentSectionIndex: 0,
    formResponses: {}, // Will store: basic_userName and basic_exEmail
    questionnaireCompleted: false,
  });

  // Timer actions
  const setTasks = (tasks: Task[]) => setTimer((prev) => ({ ...prev, tasks }));
  const addTask = (task: Task) => setTimer((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
  const setCurrentTaskIndex = (index: number) => setTimer((prev) => ({ ...prev, currentTaskIndex: index }));
  const setTimeRemaining = (time: number | ((prev: number) => number)) =>
    setTimer((prev) => ({
      ...prev,
      timeRemaining: typeof time === 'function' ? time(prev.timeRemaining) : time
    }));
  const setTimerStarted = (started: boolean) => setTimer((prev) => ({ ...prev, timerStarted: started }));
  const setTimerInterval = (interval: number | null) => setTimer((prev) => ({ ...prev, timerInterval: interval }));

  // Camera actions
  const setCameraStream = (stream: MediaStream | null) => setCamera((prev) => ({ ...prev, cameraStream: stream }));
  const setCapturedImages = (images: CapturedImage[]) => setCamera((prev) => ({ ...prev, capturedImages: images }));
  const addCapturedImage = (image: CapturedImage) => setCamera((prev) => ({ ...prev, capturedImages: [...prev.capturedImages, image] }));
  const removeCapturedImage = (index: number) => setCamera((prev) => ({ ...prev, capturedImages: prev.capturedImages.filter((_, i) => i !== index) }));
  const clearCapturedImages = () => setCamera((prev) => ({ ...prev, capturedImages: [] }));

  // Questionnaire actions
  const setCurrentSectionIndex = (index: number) => setQuestionnaire((prev) => ({ ...prev, currentSectionIndex: index }));
  const setFormResponses = (responses: QuestionnaireResponse) => setQuestionnaire((prev) => ({ ...prev, formResponses: responses }));
  const updateFormResponse = (key: string, value: string) => setQuestionnaire((prev) => ({ ...prev, formResponses: { ...prev.formResponses, [key]: value } }));
  const setQuestionnaireCompleted = (completed: boolean) => setQuestionnaire((prev) => ({ ...prev, questionnaireCompleted: completed }));

  const value: AppState = {
    currentPage,
    setCurrentPage,
    timer,
    setTasks,
    addTask,
    setCurrentTaskIndex,
    setTimeRemaining,
    setTimerStarted,
    setTimerInterval,
    camera,
    setCameraStream,
    setCapturedImages,
    addCapturedImage,
    removeCapturedImage,
    clearCapturedImages,
    questionnaire,
    setCurrentSectionIndex,
    setFormResponses,
    updateFormResponse,
    setQuestionnaireCompleted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
