import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner = ({
  size = 'medium',
  fullScreen = false,
  message,
}: LoadingSpinnerProps) => {
  const spinnerContent = (
    <div className={`loading-spinner-content ${size}`}>
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-spinner-fullscreen">
        {spinnerContent}
      </div>
    );
  }

  return <div className="loading-spinner">{spinnerContent}</div>;
};
