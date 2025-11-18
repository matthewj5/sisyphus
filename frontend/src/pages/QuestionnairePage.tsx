import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { questionnaireData } from '../data/questionnaireData';

export function QuestionnairePage() {
  const {
    currentSection,
    currentSectionIndex,
    totalSections,
    isLastSection,
    formResponses,
    updateFormResponse,
    nextSection,
    previousSection,
    skipQuestionnaire,
  } = useQuestionnaire();

  if (!currentSection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-earth-light-sand flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-earth-dark-brown mb-2">
            {questionnaireData.title}
          </h1>
          <p className="text-lg text-earth-brown">{questionnaireData.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar current={currentSectionIndex + 1} total={totalSections} />
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-earth-dark-brown mb-2">
            {currentSection.title}
          </h2>
          {currentSection.description && (
            <p className="text-earth-brown">{currentSection.description}</p>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {currentSection.questions.map((question) => {
            const key = `${currentSection.id}_${question.id}`;
            const value = formResponses[key] || '';

            return (
              <div key={question.id}>
                <label className="form-label">
                  {question.question}
                  {question.required && <span className="text-red-600 ml-1">*</span>}
                </label>

                {question.type === 'textarea' ? (
                  <textarea
                    className="form-textarea"
                    value={value}
                    onChange={(e) => updateFormResponse(key, e.target.value)}
                    placeholder={question.placeholder}
                    required={question.required}
                  />
                ) : question.type === 'select' && question.options ? (
                  <select
                    className="form-select"
                    value={value}
                    onChange={(e) => updateFormResponse(key, e.target.value)}
                    required={question.required}
                  >
                    <option value="">Select...</option>
                    {question.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={question.type}
                    className="form-input w-full"
                    value={value}
                    onChange={(e) => updateFormResponse(key, e.target.value)}
                    placeholder={question.placeholder}
                    required={question.required}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer (shown on last section) */}
        {isLastSection && questionnaireData.disclaimer && (
          <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-800 mb-3">
              ⚠️ {questionnaireData.disclaimer.title}
            </h3>
            <p className="text-sm text-red-700 mb-3">{questionnaireData.disclaimer.text}</p>
            <ul className="text-xs text-red-600 space-y-2 mb-4 ml-4">
              {questionnaireData.disclaimer.terms.map((term, idx) => (
                <li key={idx} className="list-disc">
                  {term}
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-xs text-red-700">
              <p>
                <strong>Privacy Policy:</strong> {questionnaireData.disclaimer.privacyPolicy}
              </p>
              <p>
                <strong>Data Retention:</strong> {questionnaireData.disclaimer.dataRetention}
              </p>
              <p className="font-bold text-red-800 mt-4">
                {questionnaireData.disclaimer.warning}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div>
            {currentSectionIndex > 0 && (
              <Button variant="secondary" onClick={previousSection}>
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={skipQuestionnaire}>
              Skip
            </Button>
            <Button variant={isLastSection ? 'danger' : 'primary'} onClick={nextSection}>
              {isLastSection ? 'Start Working!' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
