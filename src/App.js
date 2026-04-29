import WeatherScene from './components/WeatherScene'; // top
import React, { useState, useEffect } from 'react';
import useWeather from './hooks/useWeather';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import MainWeatherCard from './components/MainWeatherCard';
import StatsGrid from './components/StatsGrid';
import DayPeriods from './components/DayPeriods';
import HourlyChart from './components/HourlyChart';
import ForecastRow from './components/ForecastRow';
import WeatherMap from './components/WeatherMap';
import WeatherInfoPanel from './components/WeatherInfoPanel';
import CityComparison from './components/CityComparison';
import AlertsBanner from './components/AlertsBanner';
import RecentSearches from './components/RecentSearches';
import EmptyState from './components/EmptyState';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('sc_theme') || 'light');
  const [unit, setUnit]   = useState('C');
  const [activeTab, setActiveTab] = useState('home');

  const {
    weather, forecast, hourly, dayPeriods, alerts,
    loading, locating, error,
    favs, recent, comparisons,
    fetchWeather, fetchByLocation, toggleFav, loadComparisons,
  } = useWeather();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sc_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (activeTab === 'compare' && comparisons.length === 0) loadComparisons();
  }, [activeTab]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className={`app-shell ${theme}`}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        favs={favs}
        fetchWeather={fetchWeather}
      />

      {/* Main content */}
      <main className="app-main">
        {/* Top bar */}
        <div className="top-bar">
          <SearchBar
            onSearch={fetchWeather}
            onLocation={fetchByLocation}
            locating={locating}
            loading={loading}
            unit={unit}
            setUnit={setUnit}
          />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && <AlertsBanner alerts={alerts} />}

        {/* Error */}
        {error && (
          <div className="error-card">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Content area */}
        {activeTab === 'home' && (
          <>
            {!weather && !loading && (
              <EmptyState recent={recent} onSearch={fetchWeather} />
            )}
            {(weather || loading) && (
              <div className="dashboard-grid">
                {/* Left column */}
                <div className="col-left">
                  <MainWeatherCard
                    weather={weather}
                    loading={loading}
                    unit={unit}
                    favs={favs}
                    toggleFav={toggleFav}
                    theme={theme}
                  />
                  <StatsGrid weather={weather} loading={loading} unit={unit} />
                  <DayPeriods periods={dayPeriods} loading={loading} unit={unit} />
                  <WeatherScene weather={weather} />
                </div>

                {/* Right column */}
                <div className="col-right">
                  <WeatherMap weather={weather} loading={loading} theme={theme} />
                  <WeatherInfoPanel weather={weather} loading={loading} />
                  <HourlyChart hourly={hourly} loading={loading} unit={unit} />
                  <ForecastRow forecast={forecast} loading={loading} unit={unit} />
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'compare' && (
          <CityComparison comparisons={comparisons} unit={unit} theme={theme} />
        )}

        {activeTab === 'favourites' && (
          <div className="favs-page">
            <h2 className="page-title">⭐ Favourite Cities</h2>
            {favs.length === 0 ? (
              <p className="empty-msg">No favourites yet. Search for a city and click ♡ to save it!</p>
            ) : (
              <div className="favs-grid">
                {favs.map(city => (
                  <button key={city} className="fav-city-btn" onClick={() => { fetchWeather(city); setActiveTab('home'); }}>
                    <span className="fav-city-icon">🏙️</span>
                    <span>{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
