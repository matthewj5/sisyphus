import { useAppContext } from '../context/AppContext';
import { questionnaireData } from '../data/questionnaireData';

export function useQuestionnaire() {
  const {
    questionnaire,
    setCurrentSectionIndex,
    updateFormResponse,
    setQuestionnaireCompleted,
    setCurrentPage,
  } = useAppContext();

  const currentSection = questionnaireData.sections[questionnaire.currentSectionIndex];
  const totalSections = questionnaireData.sections.length;
  const isLastSection = questionnaire.currentSectionIndex === totalSections - 1;

  const validateCurrentSection = (): boolean => {
    if (!currentSection) return false;

    for (const question of currentSection.questions) {
      if (!question.required) continue;

      const key = `${currentSection.id}_${question.id}`;
      const value = questionnaire.formResponses[key];

      if (!value || value.trim() === '') {
        return false;
      }

      // Email validation
      if (question.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return false;
        }
      }
    }

    return true;
  };

  const nextSection = () => {
    if (!validateCurrentSection()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (isLastSection) {
      // Complete questionnaire
      setQuestionnaireCompleted(true);
      setCurrentPage('timer');
    } else {
      setCurrentSectionIndex(questionnaire.currentSectionIndex + 1);
    }
  };

  const previousSection = () => {
    if (questionnaire.currentSectionIndex > 0) {
      setCurrentSectionIndex(questionnaire.currentSectionIndex - 1);
    }
  };

  const skipQuestionnaire = () => {
    setQuestionnaireCompleted(true);
    setCurrentPage('timer');
  };

  return {
    currentSection,
    currentSectionIndex: questionnaire.currentSectionIndex,
    totalSections,
    isLastSection,
    formResponses: questionnaire.formResponses,
    updateFormResponse,
    nextSection,
    previousSection,
    skipQuestionnaire,
    validateCurrentSection,
  };
}
