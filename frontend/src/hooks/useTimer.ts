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

    // Remove current task from list
    const updatedTasks = timer.tasks.filter((_, index) => index !== timer.currentTaskIndex);
    setTasks(updatedTasks);

    // Move to next task or camera page
    if (updatedTasks.length > 0) {
      // Stay at same index (which is now the next task since we removed current)
      const nextTask = updatedTasks[timer.currentTaskIndex];
      if (nextTask) {
        setTimeRemaining(nextTask.duration);
        setTimerStarted(true);
      } else {
        // No more tasks
        setTimerStarted(false);
        setCurrentPage('camera');
      }
    } else {
      // All tasks done, go to camera
      setCurrentTaskIndex(0);
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

  const restartWithSameTasks = () => {
    // Reset all tasks to not completed
    const resetTasks = timer.tasks.map(task => ({ ...task, completed: false }));
    setTasks(resetTasks);
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
    restartWithSameTasks,
  };
}
