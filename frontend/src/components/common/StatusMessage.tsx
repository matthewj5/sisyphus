interface StatusMessageProps {
  message: string;
  type: 'success' | 'error' | 'loading';
  className?: string;
}

export function StatusMessage({ message, type, className = '' }: StatusMessageProps) {
  const styles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    loading: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className={`rounded-lg p-4 mb-6 text-center ${styles[type]} ${className}`}>
      <p className="font-semibold">{message}</p>
    </div>
  );
}
