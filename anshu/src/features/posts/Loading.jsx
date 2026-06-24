import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <h2>Loading{dots}</h2>
        <p>Fetching beautiful articles from the server</p>
      </div>
    </div>
  );
};

export default Loading;
