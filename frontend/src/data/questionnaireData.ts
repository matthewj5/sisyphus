/**
 * Simplified Questionnaire
 *
 * Currently collecting only essential information:
 * - User's name
 * - Ex's email (for accountability notifications)
 *
 * For the full comprehensive questionnaire, see questionnaireData.full.ts
 */

import type { QuestionnaireSection, Question } from '../types';

interface QuestionnaireData {
  title: string;
  subtitle: string;
  sections: QuestionnaireSection[];
  disclaimer?: {
    title: string;
    text: string;
    terms: string[];
    privacyPolicy: string;
    dataRetention: string;
    warning: string;
  };
}

// Helper function to create questions with defaults
function q(data: Partial<Question> & Pick<Question, 'id' | 'question'>): Question {
  return {
    type: 'text',
    required: true,
    ...data,
  };
}

export const questionnaireData: QuestionnaireData = {
  title: "Get Started with Sisyphus",
  subtitle: "The productivity app that pushes the boulder uphill",
  sections: [
    {
      title: "Basic Information",
      id: "basic",
      description: "We need a few details to hold you accountable",
      questions: [
        q({
          id: "userName",
          question: "What's your name?",
          placeholder: "Enter your name",
        }),
        q({
          id: "exEmail",
          question: "Your ex's email (for accountability)",
          type: "email",
          placeholder: "ex@example.com",
        }),
      ],
    },
  ],
  // No disclaimer for simplified version - keep it clean and simple
};
