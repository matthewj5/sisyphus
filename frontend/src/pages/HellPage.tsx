import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTimer } from '../hooks/useTimer';
import { Button } from '../components/common/Button';
import { notifyHell } from '../services/api';
import { getUserName, getExEmail } from '../utils/questionnaire';

interface HellPageProps {
  reason?: string;
}

export function HellPage({ reason = 'Failed task validation' }: HellPageProps) {
  const { setCurrentPage, questionnaire } = useAppContext();
  const { restartWithSameTasks } = useTimer();
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const userName = getUserName(questionnaire.formResponses);
  const exEmail = getExEmail(questionnaire.formResponses);

  useEffect(() => {
    // Send email notification
    const sendNotification = async () => {
      if (!exEmail || emailSent) return;

      setSending(true);
      try {
        await notifyHell(exEmail, userName || 'Anonymous', reason);
        setEmailSent(true);
      } catch (error) {
        console.error('Failed to send notification:', error);
      } finally {
        setSending(false);
      }
    };

    // Delay email send slightly for dramatic effect
    const timer = setTimeout(() => {
      sendNotification();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRestart = () => {
    restartWithSameTasks();
    setCurrentPage('timer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Flame/Hell emoji */}
        <div className="text-8xl mb-8 animate-pulse">
          🔥
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-red-500 mb-4">
          PRODUCTIVITY HELL
        </h1>

        <h2 className="text-3xl font-semibold text-red-300 mb-8">
          The Boulder Rolls Back Down
        </h2>

        {/* Message */}
        <div className="bg-black bg-opacity-50 rounded-lg p-8 mb-8">
          <p className="text-xl text-red-200 mb-4">
            You have been sent to productivity hell because:
          </p>
          <blockquote className="text-2xl font-semibold text-yellow-400 italic mb-6">
            "{reason}"
          </blockquote>

          {exEmail && (
            <div className="text-lg text-red-300">
              {sending && (
                <p className="animate-pulse">📧 Sending notification to your ex...</p>
              )}
              {emailSent && (
                <p className="text-green-400">
                  ✅ Your ex has been notified of your failure.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sisyphus Wisdom */}
        <div className="text-lg text-red-200 mb-8 italic">
          <p>"One must imagine Sisyphus happy."</p>
          <p className="text-sm mt-2 text-red-400">- Albert Camus</p>
          <p className="text-xs mt-4 text-red-500">
            (But seriously, try again. The boulder never stops rolling.)
          </p>
        </div>

        {/* Restart Button */}
        <Button variant="danger" onClick={handleRestart} className="text-xl px-8 py-4">
          Push the Boulder Again
        </Button>
      </div>
    </div>
  );
}
