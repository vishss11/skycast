import React from 'react';
import { formatTemp, getWeatherEmoji } from '../utils/weatherUtils';
import './CityComparison.css';

const CityComparison = ({ comparisons, unit }) => {
  if (comparisons.length === 0) return (
    <div className="compare-loading">
      <div className="spinner-lg" />
      <p>Loading city data...</p>
    </div>
  );

  const sorted = [...comparisons].sort((a, b) => b.temp - a.temp);

  return (
    <div className="compare-page">
      <h2 className="page-title">🌍 Global City Comparison</h2>
      <p className="compare-sub">Live weather across major cities worldwide</p>
      <div className="compare-grid">
        {sorted.map((city, i) => (
          <div key={city.name} className="compare-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="cc-rank">#{i + 1}</div>
            <div className="cc-emoji">{getWeatherEmoji(city.weatherCode)}</div>
            <div className="cc-city">{city.name}</div>
            <div className="cc-country">{city.country}</div>
            <div className="cc-temp">{formatTemp(city.temp, unit)}</div>
            <div className="cc-desc">{city.description}</div>
            <div className="cc-stats">
              <span>💧 {city.humidity}%</span>
              <span>💨 {city.wind_speed}m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityComparison;
