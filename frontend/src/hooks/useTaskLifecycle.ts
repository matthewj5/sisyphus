import { useAppContext } from '../context/AppContext';
import type { Task } from '../types';

/**
 * Manages task lifecycle operations: completion, progression, and cleanup
 */
export function useTaskLifecycle() {
  const {
    timer,
    setTasks,
    setCurrentTaskIndex,
    setTimeRemaining,
    setTimerStarted,
    setTimerInterval,
    setCurrentPage,
  } = useAppContext();

  // Utility: Clear timer interval
  const clearTimerInterval = () => {
    if (timer.timerInterval) {
      clearInterval(timer.timerInterval);
    }
    setTimerInterval(null);
  };

  // Utility: Reset timer state to defaults
  const resetTimerState = () => {
    clearTimerInterval();
    setCurrentTaskIndex(0);
    setTimeRemaining(0);
    setTimerStarted(false);
  };

  // Utility: Mark current task as completed
  const markCurrentTaskCompleted = (): Task[] => {
    console.log('=== markCurrentTaskCompleted ===');
    console.log('timer.tasks:', timer.tasks);
    console.log('timer.currentTaskIndex:', timer.currentTaskIndex);
    const result = timer.tasks.map((task, index) =>
      index === timer.currentTaskIndex ? { ...task, completed: true } : task
    );
    console.log('marked tasks:', result);
    console.log('================================');
    return result;
  };

  // Find the next incomplete task after the current index
  const findNextIncompleteTask = (tasks: Task[], currentIndex: number): number => {
    return tasks.findIndex(
      (task, index) => index > currentIndex && !task.completed
    );
  };

  // Start working on all tasks from the beginning
  const startAllTasks = () => {
    if (timer.tasks.length === 0) return;

    console.log('=== startAllTasks ===');
    console.log('tasks:', timer.tasks);
    console.log('first task:', timer.tasks[0]);
    console.log('first task duration:', timer.tasks[0].duration);
    console.log('====================');

    setCurrentTaskIndex(0);
    setTimeRemaining(timer.tasks[0].duration);
    setTimerStarted(true);
  };

  // Skip current task and move to next, or go to camera if done
  const skipCurrentTask = () => {
    const currentTask = timer.tasks[timer.currentTaskIndex];
    if (!currentTask) return;

    // Mark current task as completed
    const updatedTasks = markCurrentTaskCompleted();
    setTasks(updatedTasks);

    // Find next incomplete task
    const nextIncompleteIndex = findNextIncompleteTask(updatedTasks, timer.currentTaskIndex);

    if (nextIncompleteIndex !== -1) {
      // Found next incomplete task
      setCurrentTaskIndex(nextIncompleteIndex);
      setTimeRemaining(updatedTasks[nextIncompleteIndex].duration);
      setTimerStarted(true);
    } else {
      // No more incomplete tasks, go to camera
      setTimerStarted(false);
      setCurrentPage('camera');
    }
  };

  // Remove the current completed task (after verification)
  const removeCompletedTask = () => {
    const updatedTasks = timer.tasks.filter((_, index) => index !== timer.currentTaskIndex);
    setTasks(updatedTasks);

    // After removing, check if there are any tasks left
    if (updatedTasks.length === 0) {
      setCurrentTaskIndex(0);
      setTimeRemaining(0);
      setTimerStarted(false);
    } else if (timer.currentTaskIndex >= updatedTasks.length) {
      // Current index is out of bounds, reset to 0
      setCurrentTaskIndex(0);
      setTimeRemaining(updatedTasks[0].duration);
      setTimerStarted(false);
    } else {
      // Start the next task at the same index position
      setCurrentTaskIndex(timer.currentTaskIndex);
      setTimeRemaining(updatedTasks[timer.currentTaskIndex].duration);
      setTimerStarted(false);
    }
  };

  // Reset timer completely and clear all tasks
  const resetTimer = () => {
    setTasks([]);
    resetTimerState();
  };

  // Restart with same tasks (mark all as incomplete)
  const restartWithSameTasks = () => {
    const resetTasks = timer.tasks.map(task => ({ ...task, completed: false }));
    setTasks(resetTasks);
    resetTimerState();
  };

  // Remove all completed tasks (after failed verification)
  const removeLastCompletedTask = () => {
    const updatedTasks = timer.tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
    resetTimerState();
  };

  return {
    startAllTasks,
    skipCurrentTask,
    removeCompletedTask,
    resetTimer,
    restartWithSameTasks,
    removeLastCompletedTask,
    markCurrentTaskCompleted,
  };
}
