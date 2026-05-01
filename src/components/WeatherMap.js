import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix broken default marker icons (common Leaflet + webpack issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Moves map when city changes
const MapUpdater = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 11, { duration: 1.2 });
  }, [lat, lon]);
  return null;
};

const WeatherMap = ({ weather, loading, theme }) => {
  if (loading) return <div className="card" style={{ height: 300 }} />;
  if (!weather?.lat) return null;

  const tileUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const celsius = Math.round(weather.temp - 273.15);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', height: 300 }}>
      <MapContainer
        center={[weather.lat, weather.lon]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer url={tileUrl} />
        <Marker position={[weather.lat, weather.lon]}>
          <Popup>
            <strong>{weather.name}</strong><br />
            {celsius}°C — {weather.description}
          </Popup>
        </Marker>
        <MapUpdater lat={weather.lat} lon={weather.lon} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;