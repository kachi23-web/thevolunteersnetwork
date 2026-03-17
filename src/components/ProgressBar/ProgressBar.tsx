interface ProgressBarProps {
  raised: number;
  goal: number;
  showStats?: boolean;
  className?: string;
}

export const ProgressBar = ({ raised, goal, showStats = true, className = '' }: ProgressBarProps) => {
  // Calculate percentage - this is the core logic we're testing
  const calculatePercentage = (raised: number, goal: number): number => {
    if (goal <= 0) return 0;
    const percentage = (raised / goal) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
  };

  const percentage = calculatePercentage(raised, goal);

  return (
    <div className={`donation-progress ${className}`}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      {showStats && (
        <div className="progress-stats">
          <div className="stat">
            <span className="label">Raised:</span>
            <span className="value">${raised.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Goal:</span>
            <span className="value">${goal.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the calculation function for testing
export const calculateProgressPercentage = (raised: number, goal: number): number => {
  if (goal <= 0) return 0;
  const percentage = (raised / goal) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};
