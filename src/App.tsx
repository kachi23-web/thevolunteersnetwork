import { useEffect } from 'react';
import { initVendorLibraries, cleanupVendorLibraries } from './utils/vendor';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize vendor libraries when component mounts
    initVendorLibraries();

    // Cleanup when component unmounts
    return () => {
      cleanupVendorLibraries();
    };
  }, []);

  return (
    <div className="app">
      <div className="ul-container">
        <div className="ul-section-spacing">
          <div className="ul-section-heading">
            <div>
              <div className="ul-section-sub-title">Welcome to</div>
              <h1 className="ul-section-title">Charitics</h1>
              <p className="ul-section-descr">
                Modern React-based charity website with integrated Charitics theme
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a href="#" className="ul-btn">
              <span>Get Started</span>
              <i className="flaticon-right"></i>
            </a>
            <a href="#" className="ul-btn ul-btn--2 ms-3">
              <span>Learn More</span>
              <i className="flaticon-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
