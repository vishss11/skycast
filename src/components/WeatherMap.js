import React, { useMemo } from 'react';
import './WeatherMap.css';

const WeatherMap = ({ weather, loading, theme }) => {
  const mapUrl = useMemo(() => {
    if (!weather?.lat || !weather?.lon) return null;
    const { lat, lon } = weather;
    const bbox = `${lon-0.18},${lat-0.12},${lon+0.18},${lat+0.12}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
  }, [weather?.lat, weather?.lon]);

  return (
    <div className="map-card">
      <div className="map-header">
        <span className="map-title">📍 Location Map</span>
        {weather && (
          <span className="map-coords">
            {weather.lat?.toFixed(2)}°, {weather.lon?.toFixed(2)}°
          </span>
        )}
      </div>
      <div className="map-body">
        {loading && (
          <div className="map-placeholder">
            <div className="map-spinner"/>
            <p>Loading map…</p>
          </div>
        )}
        {!loading && !weather && (
          <div className="map-placeholder">
            <span className="map-placeholder-icon">🗺️</span>
            <p className="map-placeholder-text">Search a city to see its map</p>
          </div>
        )}
        {!loading && weather && mapUrl && (
          <>
            <iframe
              key={mapUrl}
              title="City Map"
              src={mapUrl}
              className={`map-iframe ${theme === 'dark' ? 'dark-map' : ''}`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <a
              className="map-open-link"
              href={`https://www.openstreetmap.org/?mlat=${weather.lat}&mlon=${weather.lon}#map=12/${weather.lat}/${weather.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              Open full map ↗
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherMap;
