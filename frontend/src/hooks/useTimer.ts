import { useAppContext } from '../context/AppContext';
import { useTimerInterval } from './useTimerInterval';
import { useTaskLifecycle } from './useTaskLifecycle';

/**
 * Main timer hook that composes focused hooks for timer and task management
 */
export function useTimer() {
  const { timer, setTasks, addTask, setCurrentPage } = useAppContext();

  // Task lifecycle management (completion, progression, cleanup)
  const {
    startAllTasks,
    skipCurrentTask,
    removeCompletedTask,
    resetTimer,
    restartWithSameTasks,
    removeLastCompletedTask,
    markCurrentTaskCompleted,
  } = useTaskLifecycle();

  // Timer interval countdown effect
  useTimerInterval(
    () => {
      const updatedTasks = markCurrentTaskCompleted();
      setTasks(updatedTasks);
    },
    () => setCurrentPage('camera')
  );

  const completeCurrentTask = () => {
    skipCurrentTask(); // Same logic
  };

  const deleteTask = (taskId: number) => {
    if (timer.timerStarted) return; // Can't delete while running

    const updatedTasks = timer.tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
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
    removeCompletedTask,
    resetTimer,
    restartWithSameTasks,
    removeLastCompletedTask,
  };
}
