interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
}

export function ProgressBar({ current, total, showText = true }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      {showText && (
        <div className="text-sm text-earth-dark-brown mb-2 font-semibold">
          Section {current} of {total}
        </div>
      )}
      <div className="w-full bg-earth-sand rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-earth-brown to-earth-muted-green transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
