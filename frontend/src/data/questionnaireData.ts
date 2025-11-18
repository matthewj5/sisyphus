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

const fullDisclaimerData = {
  title: "Standard Terms and Conditions",
  text: "By completing this assessment, you acknowledge that:",
  terms: [
    "We are not responsible for anything that happens with this information.",
    "We may have already lost your data in a breach that happened 5 minutes ago.",
    "Our intern Greg has full access to this database and he's going through a rough breakup.",
    "We store all passwords in a text file called 'passwords.txt' on the desktop.",
    "Our servers are three laptops duct-taped together in someone's garage.",
    "The 'Delete My Data' button actually emails your data to more people.",
    "Our encryption is just ROT13 applied twice because we think that's double encryption.",
  ],
  privacyPolicy: "What privacy? We printed your answers and posted them on the office fridge.",
  dataRetention: "Your data will outlive the heat death of the universe.",
  warning: "Legal Notice: By reading this disclaimer, you've already agreed to it.",
};

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
  disclaimer: fullDisclaimerData,
};
