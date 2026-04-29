import React from 'react';
import { formatTime, getWindDir } from '../utils/weatherUtils';
import './StatsGrid.css';

const StatBox = ({ icon, label, value, sub, gradient }) => (
  <div className="stat-box" style={{ background: gradient }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  </div>
);

const StatsGrid = ({ weather, loading, unit }) => {
  if (loading) return (
    <div className="stats-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="stat-box skeleton" style={{ height: 80 }} />
      ))}
    </div>
  );
  if (!weather) return null;

  const visKm = (weather.visibility / 1000).toFixed(1);

  return (
    <div className="stats-grid">
      <StatBox
        icon="💧" label="Humidity" value={`${weather.humidity}%`}
        sub={weather.humidity > 80 ? 'Very humid' : weather.humidity > 60 ? 'Moderate' : 'Comfortable'}
        gradient="var(--grad-teal)"
      />
      <StatBox
        icon="💨" label="Wind" value={`${weather.wind_speed} m/s`}
        sub={getWindDir(weather.wind_deg)}
        gradient="var(--grad-blue)"
      />
      <StatBox
        icon="🌡️" label="Pressure" value={`${weather.pressure} hPa`}
        sub={weather.pressure > 1013 ? 'High' : 'Low'}
        gradient="var(--grad-purple)"
      />
      <StatBox
        icon="👁️" label="Visibility" value={`${visKm} km`}
        sub={parseFloat(visKm) > 8 ? 'Clear' : parseFloat(visKm) > 4 ? 'Moderate' : 'Poor'}
        gradient="var(--grad-green)"
      />
      <StatBox
        icon="🌅" label="Sunrise" value={formatTime(weather.sunrise)}
        gradient="var(--grad-orange)"
      />
      <StatBox
        icon="🌇" label="Sunset" value={formatTime(weather.sunset)}
        gradient="var(--grad-pink)"
      />
    </div>
  );
};

export default StatsGrid;
