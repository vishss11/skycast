import React from 'react';
import { formatTemp, formatDate, getWeatherEmoji, getWeatherBg } from '../utils/weatherUtils';
import './MainWeatherCard.css';

const MainWeatherCard = ({ weather, loading, unit, favs, toggleFav, theme }) => {
  const isDark = theme === 'dark';
  const isFav = weather && favs.includes(weather.name);

  if (loading) return (
    <div className="main-weather-card loading-card">
      <div className="skeleton" style={{ width: '60%', height: 20, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '40%', height: 80, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '80%', height: 16 }} />
    </div>
  );

  if (!weather) return null;

  const bg = getWeatherBg(weather.weatherCode, isDark);

  return (
    <div className="main-weather-card" style={{ background: bg }}>
      {/* Header */}
      <div className="mw-header">
        <div>
          <h1 className="mw-city">{weather.name}, {weather.country}</h1>
          <p className="mw-date">{formatDate(weather.dt)}</p>
        </div>
        <button
          className={`fav-btn ${isFav ? 'faved' : ''}`}
          onClick={() => toggleFav(weather.name)}
          title={isFav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFav ? '⭐' : '☆'}
        </button>
      </div>

      {/* Main temp */}
      <div className="mw-center">
        <div className="mw-emoji">{getWeatherEmoji(weather.weatherCode)}</div>
        <div className="mw-temp">{formatTemp(weather.temp, unit)}</div>
        <div className="mw-desc">{weather.description}</div>
      </div>

      {/* Min/Max + feels like */}
      <div className="mw-footer">
        <div className="mw-range">
          <span>↑ {formatTemp(weather.temp_max, unit)}</span>
          <span>↓ {formatTemp(weather.temp_min, unit)}</span>
        </div>
        <div className="mw-feels">
          Feels like <strong>{formatTemp(weather.feels_like, unit)}</strong>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
