export default function Toast({ message, type = 'success', onClose }) {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-red-500',
    info: 'bg-blue-600',
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    warning: '🗑️',
    info: 'ℹ️',
  }[type];

  return (
    <div className={`fixed top-4 right-4 flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50`}>
      <span>{icon}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">✕</button>
    </div>
  );
}
