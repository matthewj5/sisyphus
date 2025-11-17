import { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { Button } from '../components/common/Button';
import { formatTime, parseTimeInput } from '../utils/timeFormatters';
import type { Task } from '../types';

export function TimerPage() {
  const {
    tasks,
    currentTaskIndex,
    timeRemaining,
    timerStarted,
    currentTask,
    addTask,
    deleteTask,
    startAllTasks,
    skipCurrentTask,
  } = useTimer();

  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState('');

  const handleAddTask = () => {
    if (!taskName.trim() || !taskDuration.trim()) {
      alert('Please enter task name and duration');
      return;
    }

    const seconds = parseTimeInput(taskDuration);
    if (seconds === null || seconds === 0) {
      alert('Invalid duration format. Use MM:SS (e.g., 25:00)');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: taskName,
      duration: seconds,
      completed: false,
    };

    addTask(newTask);
    setTaskName('');
    setTaskDuration('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, nextField?: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextField) {
        nextField();
      } else {
        handleAddTask();
      }
    }
  };

  const isWarning = timeRemaining <= 30 && timerStarted;

  return (
    <div className="min-h-screen bg-earth-light-sand p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-earth-dark-brown mb-2">
            🪨 Push the Boulder!
          </h1>
          <p className="text-earth-brown">Add tasks and start your productivity journey</p>
        </div>

        {/* Timer Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center">
            <div className={`text-6xl font-mono font-bold mb-2 ${isWarning ? 'text-red-600' : 'text-earth-dark-brown'}`}>
              {formatTime(timeRemaining)}
            </div>
            <p className="text-lg text-earth-brown">
              {currentTask ? currentTask.text : 'No task selected'}
            </p>
          </div>
        </div>

        {/* Task Queue */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-earth-dark-brown mb-4">Task Queue</h3>

          {tasks.length === 0 ? (
            <p className="text-center text-earth-brown py-8">
              Add tasks to begin your journey
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded ${
                    index === currentTaskIndex && timerStarted
                      ? 'bg-earth-muted-green text-white'
                      : 'bg-earth-light-sand'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">
                      {index === currentTaskIndex && timerStarted ? '▶' : index + 1}
                    </span>
                    <span className="font-medium">{task.text}</span>
                    <span className="text-sm opacity-75">({formatTime(task.duration)})</span>
                  </div>

                  {!timerStarted && (
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Task Section (shown before start) */}
        {!timerStarted && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-earth-dark-brown mb-4">Add Task</h3>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Enter task name..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, () => document.getElementById('taskDuration')?.focus())}
              />
              <input
                id="taskDuration"
                type="text"
                className="form-input w-24"
                placeholder="M:SS"
                maxLength={7}
                value={taskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <Button variant="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>

            {tasks.length > 0 && (
              <Button variant="danger" onClick={startAllTasks} className="w-full">
                Start Working!
              </Button>
            )}
          </div>
        )}

        {/* Timer Running Section */}
        {timerStarted && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-center text-red-600 font-semibold mb-4">
              ⚠️ Timer is running! No pausing, no going back!
            </p>
            <Button variant="secondary" onClick={skipCurrentTask} className="w-full">
              Skip Current Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
