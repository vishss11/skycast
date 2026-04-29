import React from 'react';
import RecentSearches from './RecentSearches';
import './EmptyState.css';

const SUGGESTIONS = ['Mumbai', 'London', 'Tokyo', 'New York', 'Paris', 'Dubai', 'Sydney'];

const EmptyState = ({ recent, onSearch }) => (
  <div className="empty-state">
    <div className="es-emoji">🌤️</div>
    <h2 className="es-title">SkyCast Weather</h2>
    <p className="es-sub">Search for any city to get real-time weather updates</p>
    <div className="es-suggestions">
      {SUGGESTIONS.map(city => (
        <button key={city} className="es-chip" onClick={() => onSearch(city)}>{city}</button>
      ))}
    </div>
    {recent && recent.length > 0 && (
      <div style={{ marginTop: 20 }}>
        <RecentSearches recent={recent} onSearch={onSearch} />
      </div>
    )}
  </div>
);

export default EmptyState;
