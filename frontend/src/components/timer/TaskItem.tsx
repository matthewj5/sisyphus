import type { Task } from '../../types';
import { formatTime } from '../../utils/timeFormatters';

interface TaskItemProps {
  task: Task;
  index: number;
  isCurrentTask: boolean;
  timerStarted: boolean;
  onDelete: (taskId: number) => void;
}

export function TaskItem({ task, index, isCurrentTask, timerStarted, onDelete }: TaskItemProps) {
  return (
    <li
      className={`flex items-center justify-between p-3 rounded ${
        isCurrentTask
          ? 'bg-earth-muted-green text-white'
          : 'bg-earth-light-sand text-earth-dark-brown'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm">
          {isCurrentTask ? '▶' : index + 1}
        </span>
        <span className="font-medium">{task.text}</span>
        <span className="text-sm opacity-75">({formatTime(task.duration)})</span>
      </div>

      {!timerStarted && (
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
        >
          Delete
        </button>
      )}
    </li>
  );
}
