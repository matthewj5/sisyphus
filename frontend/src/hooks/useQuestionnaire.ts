import { useAppContext } from '../context/AppContext';
import { questionnaireData } from '../data/questionnaireData';
import { validateFields } from '../utils/validators';

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

    const errors = validateFields(
      currentSection.questions,
      questionnaire.formResponses,
      currentSection.id
    );

    return Object.keys(errors).length === 0;
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
