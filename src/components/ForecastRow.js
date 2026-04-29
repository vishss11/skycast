import React from 'react';
import { formatDay, formatTemp, getWeatherEmoji } from '../utils/weatherUtils';
import './ForecastRow.css';

const ForecastRow = ({ forecast, loading, unit }) => {
  if (loading) return (
    <div className="card forecast-card">
      <div className="card-title">5-Day Forecast</div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 44, borderRadius: 10, marginBottom: 8 }} />
      ))}
    </div>
  );

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="card forecast-card">
      <div className="card-title">📅 5-Day Forecast</div>
      <div className="forecast-list">
        {forecast.map((day, i) => (
          <div key={i} className="forecast-row" style={{ animationDelay: `${i * 0.06}s` }}>
            <span className="fc-day">{formatDay(day.dt)}</span>
            <span className="fc-emoji">{getWeatherEmoji(day.weatherCode)}</span>
            <span className="fc-desc">{day.description}</span>
            <div className="fc-range">
              <span className="fc-max">{formatTemp(day.temp_max, unit)}</span>
              <span className="fc-sep"> / </span>
              <span className="fc-min">{formatTemp(day.temp_min, unit)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastRow;
