import React from 'react';
import { kelvinToCelsius } from '../utils/weatherUtils';
import './WeatherInfoPanel.css';

const getComfortLevel = (celsius, humidity) => {
  const heatIndex = celsius + (humidity > 60 ? (humidity - 60) * 0.1 : 0);
  if (heatIndex >= 40) return { label: 'Very Uncomfortable', color: '#ef4444', icon: '😰', bar: 95 };
  if (heatIndex >= 32) return { label: 'Uncomfortable', color: '#f97316', icon: '😓', bar: 75 };
  if (heatIndex >= 26) return { label: 'Comfortable', color: '#f59e0b', icon: '😊', bar: 55 };
  if (heatIndex >= 18) return { label: 'Very Comfortable', color: '#10b981', icon: '😄', bar: 35 };
  return { label: 'Cold', color: '#0ea5e9', icon: '🥶', bar: 15 };
};

const getClothingTip = (celsius, code) => {
  if (celsius >= 35) return { tip: 'Light, breathable clothing. Sun hat & sunglasses essential.', icon: '👕' };
  if (celsius >= 25) return { tip: 'T-shirt and shorts weather. Sunscreen recommended.', icon: '🩳' };
  if (celsius >= 18) return { tip: 'Light jacket or long sleeves. Comfortable jeans.', icon: '🧥' };
  if (celsius >= 10) return { tip: 'Warm jacket needed. Layers recommended.', icon: '🧣' };
  if (celsius >= 0) return { tip: 'Heavy coat, gloves and scarf. Stay warm!', icon: '🧤' };
  return { tip: 'Extreme cold gear. Minimize time outdoors.', icon: '🥾' };
};

const getActivityTip = (celsius, code, wind) => {
  const isRain = code >= 500 && code < 600;
  const isStorm = code >= 200 && code < 300;
  const isSnow = code >= 600 && code < 700;
  const isWindy = wind > 10;

  if (isStorm) return { tip: 'Stay indoors. No outdoor activities advised.', icon: '🏠', color: '#ef4444' };
  if (isRain)  return { tip: 'Indoor activities. Gym or movies recommended.', icon: '🎬', color: '#0ea5e9' };
  if (isSnow)  return { tip: 'Perfect for skiing or snowball fights!', icon: '⛷️', color: '#38bdf8' };
  if (celsius >= 30 && !isRain) return { tip: 'Morning/evening walks. Pool or beach day!', icon: '🏊', color: '#f59e0b' };
  if (celsius >= 18) return { tip: 'Great day for outdoor sports, cycling or a picnic!', icon: '🚴', color: '#10b981' };
  if (celsius >= 8)  return { tip: 'Brisk walk or jogging. Layer up well.', icon: '🏃', color: '#6366f1' };
  return { tip: 'Cozy indoor day. Perfect for reading or cooking.', icon: '📚', color: '#8b5cf6' };
};

const getSunInfo = (celsius, code) => {
  // Estimated UV based on conditions
  const isClear = code === 800 || code === 801;
  const isCloud = code >= 802;
  const isRain  = code >= 500 && code < 700;
  if (celsius >= 35 && isClear) return { uv: 9, label: 'Very High', color: '#ef4444' };
  if (celsius >= 25 && isClear) return { uv: 6, label: 'High', color: '#f97316' };
  if (celsius >= 15 && isClear) return { uv: 4, label: 'Moderate', color: '#f59e0b' };
  if (isCloud) return { uv: 2, label: 'Low', color: '#10b981' };
  if (isRain)  return { uv: 1, label: 'Very Low', color: '#0ea5e9' };
  return { uv: 3, label: 'Low–Moderate', color: '#84cc16' };
};

const WeatherInfoPanel = ({ weather, loading }) => {
  if (loading) return (
    <div className="card info-panel-card">
      <div className="card-title">🧠 Smart Insights</div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 60, borderRadius: 12, marginBottom: 10 }} />
      ))}
    </div>
  );

  if (!weather) return null;

  const celsius = kelvinToCelsius(weather.temp);
  const comfort = getComfortLevel(celsius, weather.humidity);
  const clothing = getClothingTip(celsius, weather.weatherCode);
  const activity = getActivityTip(celsius, weather.weatherCode, weather.wind_speed);
  const sun = getSunInfo(celsius, weather.weatherCode);

  return (
    <div className="card info-panel-card">
      <div className="card-title">🧠 Smart Insights</div>

      {/* Comfort Index */}
      <div className="insight-block">
        <div className="insight-row">
          <span className="insight-icon">{comfort.icon}</span>
          <div className="insight-content">
            <div className="insight-label">Comfort Index</div>
            <div className="insight-value" style={{ color: comfort.color }}>{comfort.label}</div>
          </div>
        </div>
        <div className="comfort-bar-bg">
          <div className="comfort-bar-fill" style={{ width: `${comfort.bar}%`, background: comfort.color }} />
        </div>
      </div>

      {/* UV Index */}
      <div className="insight-block">
        <div className="insight-row">
          <span className="insight-icon">☀️</span>
          <div className="insight-content">
            <div className="insight-label">Est. UV Index</div>
            <div className="insight-value" style={{ color: sun.color }}>
              {sun.uv} — {sun.label}
            </div>
          </div>
          <div className="uv-badge" style={{ background: sun.color }}>{sun.uv}</div>
        </div>
      </div>

      {/* Clothing Tip */}
      <div className="insight-block tip-block">
        <div className="tip-icon">{clothing.icon}</div>
        <div>
          <div className="tip-label">What to wear</div>
          <div className="tip-text">{clothing.tip}</div>
        </div>
      </div>

      {/* Activity Tip */}
      <div className="insight-block tip-block" style={{ borderColor: activity.color + '33' }}>
        <div className="tip-icon">{activity.icon}</div>
        <div>
          <div className="tip-label">Activity Suggestion</div>
          <div className="tip-text" style={{ color: activity.color }}>{activity.tip}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoPanel;
