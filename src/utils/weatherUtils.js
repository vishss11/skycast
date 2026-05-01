export const kelvinToCelsius = (k) => k - 273.15;
export const kelvinToFahrenheit = (k) => (k - 273.15) * 9/5 + 32;

export const formatTemp = (kelvin, unit) =>
  unit === 'C'
    ? `${Math.round(kelvinToCelsius(kelvin))}°C`
    : `${Math.round(kelvinToFahrenheit(kelvin))}°F`;

export const formatTime = (unix, timezoneOffset = 0) => {
  const d = new Date((unix + timezoneOffset) * 1000);
  return d.toUTCString().slice(17, 22);
};

export const formatDay = (unix) =>
  new Date(unix * 1000).toLocaleDateString([], { weekday: 'short' });

export const formatDate = (unix) =>
  new Date(unix * 1000).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

export const formatHour = (unix) => {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getWindDir = (deg) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
};

export const getWeatherEmoji = (code) => {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 400) return '🌦️';
  if (code >= 500 && code < 600) {
    if (code === 500 || code === 501) return '🌧️';
    if (code >= 502) return '⛈️';
    return '🌦️';
  }
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code === 801) return '🌤️';
  if (code === 802) return '⛅';
  if (code === 803 || code === 804) return '☁️';
  return '🌡️';
};

export const getWeatherBg = (code, isDark) => {
  if (isDark) {
    if (code >= 200 && code < 300) return 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)';
    if (code >= 500 && code < 600) return 'linear-gradient(135deg, #1e3a5f 0%, #0f2447 50%, #162032 100%)';
    if (code >= 600 && code < 700) return 'linear-gradient(135deg, #1e3a5f 0%, #1a2f4a 50%, #0f1f30 100%)';
    if (code === 800) return 'linear-gradient(135deg, #1a0a4f 0%, #2d1b69 50%, #1a0a4f 100%)';
    return 'linear-gradient(135deg, #0f0c24 0%, #160d35 50%, #0f0c24 100%)';
  }
  if (code >= 200 && code < 300) return 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #e0e7ff 100%)';
  if (code >= 500 && code < 600) return 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #dbeafe 100%)';
  if (code >= 600 && code < 700) return 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #e0f2fe 100%)';
  if (code === 800) return 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)';
  return 'linear-gradient(135deg, #f0f2ff 0%, #e8eaf8 50%, #f0f2ff 100%)';
};

export const getUVLabel = (uvi) => {
  if (uvi <= 2) return { label: 'Low', color: '#10b981' };
  if (uvi <= 5) return { label: 'Moderate', color: '#f59e0b' };
  if (uvi <= 7) return { label: 'High', color: '#f97316' };
  if (uvi <= 10) return { label: 'Very High', color: '#ef4444' };
  return { label: 'Extreme', color: '#7c3aed' };
};

export const getLottieUrl = (code) => {
  if (code >= 200 && code < 300) return 'https://assets7.lottiefiles.com/packages/lf20_t6jiu7qz.json';
  if (code >= 500 && code < 600) return 'https://assets7.lottiefiles.com/packages/lf20_ylvv4wro.json';
  if (code >= 600 && code < 700) return 'https://assets7.lottiefiles.com/packages/lf20_8hxfxvhl.json';
  if (code >= 700 && code < 800) return 'https://assets7.lottiefiles.com/packages/lf20_CTaizi.json';
  if (code === 800) return 'https://assets7.lottiefiles.com/packages/lf20_xlmz9xwm.json';
  if (code === 801 || code === 802) return 'https://assets7.lottiefiles.com/packages/lf20_nXwOJj.json';
  return 'https://assets7.lottiefiles.com/packages/lf20_nXwOJj.json';
};
