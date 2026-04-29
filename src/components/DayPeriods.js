import React from 'react';
import { formatTemp, getWeatherEmoji } from '../utils/weatherUtils';
import './DayPeriods.css';

const PERIOD_ICONS = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌆',
  Night: '🌙',
};

const DayPeriods = ({ periods, loading, unit }) => {
  if (loading) return (
    <div className="card day-periods-card">
      <div className="card-title">Today's Overview</div>
      <div className="periods-row">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton period-skeleton" />)}
      </div>
    </div>
  );

  if (!periods || periods.length === 0) return null;

  return (
    <div className="card day-periods-card">
      <div className="card-title">Today's Overview</div>
      <div className="periods-row">
        {periods.map((p, i) => (
          <div key={i} className="period-item" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="period-label-icon">{PERIOD_ICONS[p.label] || '🌡️'}</div>
            <div className="period-time">{p.label}</div>
            <div className="period-emoji">{getWeatherEmoji(p.code)}</div>
            <div className="period-temp">{formatTemp(p.temp, unit)}</div>
            <div className="period-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayPeriods;
