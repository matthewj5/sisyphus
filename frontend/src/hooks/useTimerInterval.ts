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
    console.log('useTimerInterval effect running. timerStarted:', timer.timerStarted);

    // Always cleanup previous interval when timer stops
    if (!timer.timerStarted) {
      console.log('Timer not started, cleaning up...');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTimerInterval(null);
        intervalRef.current = null;
      }
      return;
    }

    console.log('Starting new interval...');
    // Start new interval
    const interval = window.setInterval(() => {
      console.log('Interval tick...');
      // Use functional update to avoid stale closure
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;

        // When time runs out, mark as completed and go to camera page
        if (newTime <= 0) {
          console.log('=== Timer Expired ===');
          console.log('Calling markTaskCompleted...');
          markTaskCompletedRef.current();
          console.log('Setting timerStarted to false...');
          setTimerStarted(false);
          console.log('Navigating to camera...');
          navigateToCameraRef.current();
          console.log('====================');
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
