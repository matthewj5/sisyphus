import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * Manages the countdown timer interval and auto-completion when time runs out
 * Uses useRef to prevent memory leaks from abandoned intervals
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

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Always cleanup previous interval when timer stops
    if (!timer.timerStarted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTimerInterval(null);
        intervalRef.current = null;
      }
      return;
    }

    // Start new interval
    const interval = window.setInterval(() => {
      setTimeRemaining(timer.timeRemaining - 1);

      // When time runs out, mark as completed and go to camera page
      if (timer.timeRemaining - 1 <= 0) {
        markTaskCompleted();
        setTimerStarted(false);
        navigateToCamera();
      }
    }, 1000);

    intervalRef.current = interval;
    setTimerInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
        intervalRef.current = null;
      }
    };
  }, [timer.timerStarted, timer.timeRemaining]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
