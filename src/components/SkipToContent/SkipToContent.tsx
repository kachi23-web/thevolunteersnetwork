import './SkipToContent.css';

export const SkipToContent: React.FC = () => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      // Remove tabindex after focus to restore normal tab order
      setTimeout(() => mainContent.removeAttribute('tabindex'), 100);
    }
  };

  return (
    <a 
      href="#main-content" 
      className="skip-to-content"
      onClick={handleSkip}
    >
      Skip to main content
    </a>
  );
};
