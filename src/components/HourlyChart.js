import React from 'react';
import { kelvinToCelsius, kelvinToFahrenheit, formatHour, getWeatherEmoji } from '../utils/weatherUtils';
import './HourlyChart.css';

const HourlyChart = ({ hourly, loading, unit }) => {
  if (loading) return (
    <div className="card hourly-card">
      <div className="card-title">24-Hour Forecast</div>
      <div className="hourly-skeleton-row">
        {[...Array(8)].map((_, i) => <div key={i} className="skeleton hourly-skel-item" />)}
      </div>
    </div>
  );

  if (!hourly || hourly.length === 0) return null;

  const temps = hourly.map(h => unit === 'C' ? kelvinToCelsius(h.temp) : kelvinToFahrenheit(h.temp));
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;

  return (
    <div className="card hourly-card">
      <div className="card-title">🕐 24-Hour Forecast</div>
      <div className="hourly-scroll">
        {hourly.map((h, i) => {
          const t = temps[i];
          const barH = 20 + ((t - min) / range) * 50;
          return (
            <div key={i} className="hourly-item" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="h-time">{formatHour(h.dt)}</div>
              <div className="h-emoji">{getWeatherEmoji(h.code)}</div>
              <div className="h-bar-wrapper">
                <div
                  className="h-bar"
                  style={{ height: `${barH}px` }}
                  title={`${h.desc} — ${Math.round(t)}°${unit}`}
                />
              </div>
              <div className="h-temp">{Math.round(t)}°</div>
              {h.pop > 0.1 && (
                <div className="h-pop">💧{Math.round(h.pop * 100)}%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyChart;
