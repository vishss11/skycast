import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocation, locating, loading, unit, setUnit }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) { onSearch(query.trim()); setQuery(''); }
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-input-group">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search city, country..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Search'}
        </button>
      </div>

      <div className="search-actions">
        <button
          className="loc-btn"
          onClick={onLocation}
          disabled={locating || loading}
          title="Use my location"
        >
          {locating ? <span className="spinner sm" /> : '📍'}
          <span>{locating ? 'Locating...' : 'My Location'}</span>
        </button>

        <div className="unit-toggle">
          <button
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => setUnit('C')}
          >°C</button>
          <button
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => setUnit('F')}
          >°F</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
