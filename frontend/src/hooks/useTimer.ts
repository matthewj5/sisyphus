import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export function useTimer() {
  const {
    timer,
    setTasks,
    addTask,
    setCurrentTaskIndex,
    setTimeRemaining,
    setTimerStarted,
    setTimerInterval,
    setCurrentPage,
  } = useAppContext();

  // Timer interval effect
  useEffect(() => {
    if (!timer.timerStarted || timer.timeRemaining <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeRemaining(timer.timeRemaining - 1);

      // When time runs out, go to camera page
      if (timer.timeRemaining - 1 <= 0) {
        setTimerStarted(false);
        setCurrentPage('camera');
      }
    }, 1000);

    setTimerInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer.timerStarted, timer.timeRemaining]);

  const startAllTasks = () => {
    if (timer.tasks.length === 0) return;

    setCurrentTaskIndex(0);
    setTimeRemaining(timer.tasks[0].duration);
    setTimerStarted(true);
  };

  const skipCurrentTask = () => {
    const currentTask = timer.tasks[timer.currentTaskIndex];
    if (!currentTask) return;

    // Mark current task as completed
    const updatedTasks = timer.tasks.map((task, index) =>
      index === timer.currentTaskIndex ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);

    // Move to next task or camera page
    if (timer.currentTaskIndex < timer.tasks.length - 1) {
      const nextIndex = timer.currentTaskIndex + 1;
      setCurrentTaskIndex(nextIndex);
      setTimeRemaining(timer.tasks[nextIndex].duration);
      setTimerStarted(true);
    } else {
      // All tasks done, go to camera
      setTimerStarted(false);
      setCurrentPage('camera');
    }
  };

  const completeCurrentTask = () => {
    skipCurrentTask(); // Same logic
  };

  const deleteTask = (taskId: number) => {
    if (timer.timerStarted) return; // Can't delete while running

    const updatedTasks = timer.tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const resetTimer = () => {
    setTasks([]);
    setCurrentTaskIndex(0);
    setTimeRemaining(0);
    setTimerStarted(false);
    if (timer.timerInterval) {
      clearInterval(timer.timerInterval);
    }
    setTimerInterval(null);
  };

  return {
    tasks: timer.tasks,
    currentTaskIndex: timer.currentTaskIndex,
    timeRemaining: timer.timeRemaining,
    timerStarted: timer.timerStarted,
    currentTask: timer.tasks[timer.currentTaskIndex],
    addTask,
    deleteTask,
    startAllTasks,
    skipCurrentTask,
    completeCurrentTask,
    resetTimer,
  };
}
