import { useEffect, useRef, useCallback } from 'react';
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

  // Store callbacks in refs to avoid recreating interval
  const markTaskCompletedRef = useRef(markTaskCompleted);
  const navigateToCameraRef = useRef(navigateToCamera);

  // Update refs when callbacks change
  useEffect(() => {
    markTaskCompletedRef.current = markTaskCompleted;
    navigateToCameraRef.current = navigateToCamera;
  }, [markTaskCompleted, navigateToCamera]);

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
      // Use functional update to avoid stale closure
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;

        // When time runs out, mark as completed and go to camera page
        if (newTime <= 0) {
          markTaskCompletedRef.current();
          setTimerStarted(false);
          navigateToCameraRef.current();
          return 0;
        }

        return newTime;
      });
    }, 1000);

    intervalRef.current = interval;
    setTimerInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
        intervalRef.current = null;
      }
    };
  }, [timer.timerStarted, setTimeRemaining, setTimerStarted, setTimerInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
