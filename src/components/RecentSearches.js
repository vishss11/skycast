import React from 'react';
import './RecentSearches.css';

const RecentSearches = ({ recent, onSearch }) => {
  if (!recent || recent.length === 0) return null;
  return (
    <div className="recent-row">
      <span className="recent-label">Recent:</span>
      {recent.map(city => (
        <button key={city} className="recent-chip" onClick={() => onSearch(city)}>{city}</button>
      ))}
    </div>
  );
};

export default RecentSearches;
