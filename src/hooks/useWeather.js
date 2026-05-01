import { useState, useCallback } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // paste your key from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const get = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
};

const safeFetch = async (url) => {
  try { const res = await fetch(url); return res.ok ? res.json() : null; } catch { return null; }
};

const parseDailyForecast = (data) => {
  if (!data?.list) return [];
  const grouped = {};
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  return Object.entries(grouped).slice(1, 6).map(([, items]) => {
    const temps = items.map(i => i.main.temp);
    const mid = items[Math.floor(items.length / 2)];
    return {
      dt: mid.dt,
      temp_max: Math.max(...temps),
      temp_min: Math.min(...temps),
      weatherCode: mid.weather[0].id,
      description: mid.weather[0].description,
      humidity: mid.main.humidity,
      wind: mid.wind.speed,
    };
  });
};

const parseHourly = (data) => {
  if (!data?.list) return [];
  return data.list.slice(0, 8).map(item => ({
    dt: item.dt,
    temp: item.main.temp,
    code: item.weather[0].id,
    desc: item.weather[0].description,
    humidity: item.main.humidity,
    wind: item.wind.speed,
    pop: item.pop || 0,
  }));
};

const parseDayPeriods = (data) => {
  if (!data?.list) return [];
  const today = new Date().toDateString();
  const periods = [
    { label: 'Morning',   range: [6, 12] },
    { label: 'Afternoon', range: [12, 17] },
    { label: 'Evening',   range: [17, 21] },
    { label: 'Night',     range: [21, 6] },
  ];
  const todayItems = data.list.filter(item =>
    new Date(item.dt * 1000).toDateString() === today ||
    new Date(item.dt * 1000).toDateString() === new Date(Date.now() + 86400000).toDateString()
  ).slice(0, 12);

  return periods.map(p => {
    const match = todayItems.find(item => {
      const h = new Date(item.dt * 1000).getHours();
      if (p.range[0] < p.range[1]) return h >= p.range[0] && h < p.range[1];
      return h >= p.range[0] || h < p.range[1];
    }) || todayItems[0];
    return match ? {
      label: p.label,
      temp: match.main.temp,
      code: match.weather[0].id,
      desc: match.weather[0].description,
    } : null;
  }).filter(Boolean);
};

const normalise = (data) => ({
  name: data.name,
  country: data.sys.country,
  dt: data.dt,
  temp: data.main.temp,
  feels_like: data.main.feels_like,
  temp_min: data.main.temp_min,
  temp_max: data.main.temp_max,
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  wind_speed: data.wind.speed,
  wind_deg: data.wind.deg ?? 0,
  visibility: data.visibility,
  weatherCode: data.weather[0].id,
  description: data.weather[0].description,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  timezone: data.timezone,
  clouds: data.clouds?.all ?? 0,
  lat:    data.coord?.lat,   // ← ADD
  lon:    data.coord?.lon,   // ← ADD
});

const getAlerts = (w) => {
  const alerts = [];
  if (!w) return alerts;
  const kTemp = w.temp;
  const celsius = kTemp - 273.15;
  if (celsius >= 40) alerts.push({ type: 'danger', msg: '🌡️ Extreme heat warning! Stay indoors.' });
  else if (celsius >= 35) alerts.push({ type: 'warn', msg: '☀️ High temperature. Stay hydrated.' });
  else if (celsius <= 0) alerts.push({ type: 'info', msg: '🥶 Below freezing. Dress warmly.' });
  if (w.wind_speed >= 15) alerts.push({ type: 'warn', msg: '💨 Strong winds. Be cautious outdoors.' });
  const code = w.weatherCode;
  if (code >= 200 && code < 300) alerts.push({ type: 'danger', msg: '⛈️ Thunderstorm warning!' });
  if (code >= 500 && code < 600) alerts.push({ type: 'info', msg: '🌧️ Rain expected. Carry an umbrella.' });
  if (code >= 600 && code < 700) alerts.push({ type: 'warn', msg: '❄️ Snow expected. Drive carefully.' });
  if (w.visibility < 1000) alerts.push({ type: 'danger', msg: '🌫️ Very low visibility.' });
  return alerts;
};

const CITIES = [
  'London', 'Tokyo', 'New York', 'Mumbai', 'Sydney', 'Dubai',
  'Paris', 'Singapore', 'Toronto', 'Cairo', 'São Paulo', 'Seoul'
];

const useWeather = () => {
  const [weather, setWeather]     = useState(null);
  const [forecast, setForecast]   = useState([]);
  const [hourly, setHourly]       = useState([]);
  const [dayPeriods, setDayPeriods] = useState([]);
  const [alerts, setAlerts]       = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [locating, setLocating]   = useState(false);
  const [comparisons, setComparisons] = useState([]);
  const [favs, setFavs]           = useState(() => JSON.parse(localStorage.getItem('sc_favs') || '[]'));
  const [recent, setRecent]       = useState(() => JSON.parse(localStorage.getItem('sc_recent') || '[]'));

  const addRecent = (city) => {
    setRecent(prev => {
      const next = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
      localStorage.setItem('sc_recent', JSON.stringify(next));
      return next;
    });
  };

  const toggleFav = (city) => {
    setFavs(prev => {
      const exists = prev.includes(city);
      const next = exists ? prev.filter(c => c !== city) : [...prev, city];
      localStorage.setItem('sc_favs', JSON.stringify(next));
      return next;
    });
  };

  const processResults = (currentData, forecastData) => {
    const w = normalise(currentData);
    setWeather(w);
    setAlerts(getAlerts(w));
    if (forecastData) {
      setForecast(parseDailyForecast(forecastData));
      setHourly(parseHourly(forecastData));
      setDayPeriods(parseDayPeriods(forecastData));
    }
  };

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true); setError(''); setWeather(null); setForecast([]); setHourly([]); setDayPeriods([]); setAlerts([]);
    try {
      const [cur, fore] = await Promise.all([
        get(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`),
        safeFetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&cnt=40`),
      ]);
      processResults(cur, fore);
      addRecent(city);
    } catch (err) {
      setError(err.message.includes('city not found') || err.message.includes('404')
        ? 'City not found. Please check the spelling.' : err.message);
    } finally {
      setLoading(false);
      
    }
  }, []);

  const fetchByLocation = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setLocating(true); setError(''); setWeather(null); setForecast([]); setHourly([]); setDayPeriods([]); setAlerts([]);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        setLocating(false); setLoading(true);
        try {
          const [cur, fore] = await Promise.all([
            get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
            safeFetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=40`),
          ]);
          processResults(cur, fore);
          addRecent(cur.name);
        } catch (err) { setError(err.message); }
        finally { setLoading(false); }
      },
      () => { setLocating(false); setError('Location access denied. Please search manually.'); }
    );
  }, []);

  const loadComparisons = useCallback(async () => {
    const results = await Promise.all(
      CITIES.map(city => safeFetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`))
    );
    setComparisons(results.filter(Boolean).map(normalise));
  }, []);

  return {
    weather, forecast, hourly, dayPeriods, alerts,
    loading, locating, error,
    favs, recent, comparisons,
    fetchWeather, fetchByLocation, toggleFav, loadComparisons,
  };
};

export default useWeather;
