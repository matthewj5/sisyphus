import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * Manages the countdown timer interval and auto-completion when time runs out
 */
export function useTimerInterval(
  markTaskCompleted: () => void,
  navigateToCamera: () => void
) {
  const {
    timer,
    setTimeRemaining,
    setTimerStarted,
    setTimerInterval,
  } = useAppContext();

  useEffect(() => {
    if (!timer.timerStarted || timer.timeRemaining <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeRemaining(timer.timeRemaining - 1);

      // When time runs out, mark as completed and go to camera page
      if (timer.timeRemaining - 1 <= 0) {
        markTaskCompleted();
        setTimerStarted(false);
        navigateToCamera();
      }
    }, 1000);

    setTimerInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.timerStarted, timer.timeRemaining]);
}
