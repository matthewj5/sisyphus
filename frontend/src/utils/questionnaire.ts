import type { QuestionnaireResponse } from '../types';

/**
 * Helper functions to extract specific questionnaire responses
 */

export function getUserName(responses: QuestionnaireResponse): string {
  return responses['basic_userName'] || '';
}

export function getExEmail(responses: QuestionnaireResponse): string {
  return responses['basic_exEmail'] || '';
}

/**
 * Check if all required questionnaire fields are filled
 */
export function isQuestionnaireComplete(responses: QuestionnaireResponse): boolean {
  const userName = getUserName(responses);
  const exEmail = getExEmail(responses);

  return !!(userName && exEmail);
}
