import React from 'react';
import './WeatherScene.css';

const getScene = (code, tempC) => {
  if (code >= 200 && code < 300) return 'storm';
  if (code >= 500 && code < 600) return 'rain';
  if (code >= 600 && code < 700) return 'snow';
  if (code >= 700 && code < 800) return 'fog';
  if (code === 800) return tempC >= 35 ? 'hot' : 'sunny';
  return 'cloudy';
};

const TIPS = {
  sunny: { icon:'😎', text:"Great day to go out and enjoy!" },
  hot:   { icon:'🥵', text:"Stay indoors & drink plenty of water" },
  rain:  { icon:'☔', text:"Carry an umbrella before stepping out" },
  storm: { icon:'⚡', text:"Stay indoors — dangerous conditions!" },
  snow:  { icon:'🧤', text:"Bundle up warm, it's freezing outside" },
  cloudy:{ icon:'🌥️', text:"Mild day, light layers recommended" },
  fog:   { icon:'🌫️', text:"Drive carefully — low visibility today" },
};

const LABELS = {
  sunny:'Clear Sky', hot:'Scorching Hot', rain:'Rainy Day',
  storm:'Thunderstorm', snow:'Snowy Day', cloudy:'Cloudy', fog:'Foggy',
};

/* ── SVG Scenes ── */
const SunnyScene = () => (
  <g>
    <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1565c0"/><stop offset="100%" stopColor="#42a5f5"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#sg)"/>
    <circle cx="255" cy="38" r="30" fill="#FFD600"/>
    <circle cx="255" cy="38" r="42" fill="#FFD600" opacity="0.15"/>
    {[0,45,90,135,180,225,270,315].map((a,i)=><line key={i} x1="255" y1="38" x2={255+Math.cos(a*Math.PI/180)*56} y2={38+Math.sin(a*Math.PI/180)*56} stroke="#FFD600" strokeWidth="2.5" opacity="0.4"/>)}
    <rect x="0" y="92" width="52" height="68" fill="#0d2461" opacity="0.85"/>
    <rect x="57" y="68" width="42" height="92" fill="#1a237e" opacity="0.88"/>
    <rect x="104" y="100" width="36" height="60" fill="#0d2461" opacity="0.8"/>
    <rect x="145" y="52" width="56" height="108" fill="#1a237e" opacity="0.9"/>
    <rect x="206" y="76" width="46" height="84" fill="#0d2461" opacity="0.85"/>
    <rect x="257" y="98" width="40" height="62" fill="#1a237e" opacity="0.82"/>
    {[[8,102],[28,102],[8,116],[62,78],[82,78],[62,94],[150,62],[172,62],[150,78],[210,86],[230,86]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#FFE082" opacity="0.9" rx="1"/>)}
    <rect x="0" y="150" width="320" height="10" fill="#1b5e20" opacity="0.55"/>
    <circle cx="82" cy="130" r="6.5" fill="#FFCC80"/>
    <rect x="76" y="136" width="12" height="16" fill="#1565c0" rx="2"/>
    <line x1="76" y1="140" x2="68" y2="149" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="88" y1="140" x2="96" y2="148" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="78" y1="152" x2="75" y2="161" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="85" y1="152" x2="88" y2="161" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
  </g>
);

const RainScene = () => (
  <g>
    <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1c2f5e"/><stop offset="100%" stopColor="#3d5a80"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#rg)"/>
    <ellipse cx="80" cy="30" rx="58" ry="26" fill="#546e7a" opacity="0.9"/>
    <ellipse cx="130" cy="20" rx="42" ry="20" fill="#607d8b" opacity="0.88"/>
    <ellipse cx="210" cy="28" rx="62" ry="24" fill="#455a64" opacity="0.92"/>
    <ellipse cx="275" cy="22" rx="48" ry="19" fill="#546e7a" opacity="0.88"/>
    {Array.from({length:26}).map((_,i)=><line key={i} x1={12+i*12} y1={50+((i*19)%32)} x2={8+i*12} y2={72+((i*19)%32)} stroke="#90caf9" strokeWidth="1.5" opacity="0.55"/>)}
    <rect x="0" y="96" width="52" height="64" fill="#1a2332" opacity="0.92"/>
    <rect x="57" y="74" width="42" height="86" fill="#243040" opacity="0.92"/>
    <rect x="104" y="104" width="36" height="56" fill="#1a2332" opacity="0.88"/>
    <rect x="145" y="58" width="56" height="102" fill="#243040" opacity="0.95"/>
    <rect x="206" y="82" width="46" height="78" fill="#1a2332" opacity="0.9"/>
    <rect x="257" y="100" width="40" height="60" fill="#243040" opacity="0.88"/>
    {[[8,106],[28,106],[8,120],[62,84],[82,84],[150,68],[172,68],[210,92],[230,92]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#FFF176" opacity="0.82" rx="1"/>)}
    <ellipse cx="90" cy="157" rx="42" ry="5" fill="#90caf9" opacity="0.28"/>
    <circle cx="86" cy="126" r="6" fill="#FFCC80"/>
    <rect x="80" y="132" width="12" height="16" fill="#c62828" rx="2"/>
    <path d="M73 120 Q86 108 99 120 Z" fill="#c62828"/>
    <line x1="86" y1="120" x2="86" y2="130" stroke="#555" strokeWidth="1.5"/>
    <line x1="86" y1="130" x2="89" y2="133" stroke="#555" strokeWidth="1.5"/>
    <line x1="82" y1="148" x2="79" y2="157" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="89" y1="148" x2="92" y2="157" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
  </g>
);

const StormScene = () => (
  <g>
    <defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0e1a"/><stop offset="100%" stopColor="#1a2030"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#stg)"/>
    <ellipse cx="70" cy="28" rx="68" ry="28" fill="#1c2331" opacity="0.98"/>
    <ellipse cx="150" cy="18" rx="52" ry="22" fill="#212f3d" opacity="0.98"/>
    <ellipse cx="230" cy="26" rx="68" ry="26" fill="#1a252f" opacity="0.98"/>
    <ellipse cx="305" cy="20" rx="48" ry="20" fill="#1c2331" opacity="0.98"/>
    <polygon points="168,38 156,76 168,76 154,112 182,70 168,70 182,38" fill="#FFD600" opacity="0.98"/>
    <circle cx="168" cy="55" r="18" fill="#FFD600" opacity="0.06"/>
    {Array.from({length:22}).map((_,i)=><line key={i} x1={8+i*14} y1={58+((i*13)%22)} x2={4+i*14} y2={80+((i*13)%22)} stroke="#90caf9" strokeWidth="2" opacity="0.45"/>)}
    <rect x="0" y="100" width="56" height="60" fill="#060a10" opacity="0.98"/>
    <rect x="61" y="80" width="42" height="80" fill="#080d16" opacity="0.98"/>
    <rect x="108" y="108" width="36" height="52" fill="#060a10" opacity="0.95"/>
    <rect x="205" y="88" width="46" height="72" fill="#060a10" opacity="0.98"/>
    <rect x="256" y="104" width="64" height="56" fill="#080d16" opacity="0.95"/>
    {[[8,110],[30,110],[66,90],[86,90],[210,98],[232,98]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#FFE082" opacity="0.65" rx="1"/>)}
  </g>
);

const CloudyScene = () => (
  <g>
    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7e8fa4"/><stop offset="100%" stopColor="#b8c6d4"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#cg)"/>
    <ellipse cx="65" cy="32" rx="58" ry="26" fill="#cfd8dc" opacity="0.9"/>
    <ellipse cx="108" cy="22" rx="46" ry="22" fill="#eceff1" opacity="0.85"/>
    <ellipse cx="200" cy="30" rx="62" ry="25" fill="#cfd8dc" opacity="0.9"/>
    <ellipse cx="268" cy="20" rx="52" ry="20" fill="#eceff1" opacity="0.85"/>
    <rect x="0" y="94" width="52" height="66" fill="#3949ab" opacity="0.72"/>
    <rect x="57" y="70" width="42" height="90" fill="#5c6bc0" opacity="0.76"/>
    <rect x="104" y="102" width="36" height="58" fill="#3949ab" opacity="0.7"/>
    <rect x="145" y="56" width="56" height="104" fill="#5c6bc0" opacity="0.8"/>
    <rect x="206" y="80" width="46" height="80" fill="#3949ab" opacity="0.74"/>
    <rect x="257" y="96" width="40" height="64" fill="#5c6bc0" opacity="0.77"/>
    {[[8,104],[28,104],[8,118],[62,80],[82,80],[150,66],[172,66],[210,90],[230,90]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#FFF9C4" opacity="0.8" rx="1"/>)}
    <circle cx="78" cy="128" r="6" fill="#FFCC80"/>
    <rect x="72" y="134" width="12" height="16" fill="#5c6bc0" rx="2"/>
    <line x1="72" y1="138" x2="64" y2="147" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="84" y1="138" x2="92" y2="146" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="74" y1="150" x2="71" y2="159" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
    <line x1="81" y1="150" x2="84" y2="159" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round"/>
  </g>
);

const HotScene = () => (
  <g>
    <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e65100"/><stop offset="100%" stopColor="#ffb300"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#hg)"/>
    <circle cx="268" cy="36" r="40" fill="#FF6F00" opacity="0.92"/>
    <circle cx="268" cy="36" r="56" fill="#FF8F00" opacity="0.12"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=><line key={i} x1="268" y1="36" x2={268+Math.cos(a*Math.PI/180)*72} y2={36+Math.sin(a*Math.PI/180)*72} stroke="#FFD600" strokeWidth="2" opacity="0.3"/>)}
    <path d="M0 112 Q40 102 80 112 Q120 122 160 112 Q200 102 240 112 Q280 122 320 112" stroke="#FF8F00" strokeWidth="2.5" fill="none" opacity="0.2"/>
    <rect x="0" y="140" width="320" height="20" fill="#E65100" opacity="0.4"/>
    <rect x="0" y="90" width="52" height="70" fill="#b71c1c" opacity="0.78"/>
    <rect x="57" y="66" width="42" height="94" fill="#c62828" opacity="0.82"/>
    <rect x="104" y="100" width="36" height="60" fill="#b71c1c" opacity="0.74"/>
    <rect x="145" y="52" width="56" height="108" fill="#c62828" opacity="0.85"/>
    <rect x="206" y="76" width="46" height="84" fill="#b71c1c" opacity="0.78"/>
    {[[8,100],[30,100],[8,114],[62,76],[82,76],[150,62],[172,62],[210,86],[230,86]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#1a0000" opacity="0.65" rx="1"/>)}
    <rect x="285" y="110" width="8" height="42" fill="#2e7d32" rx="4"/>
    <rect x="276" y="120" width="8" height="20" fill="#2e7d32" rx="4"/>
    <rect x="294" y="124" width="8" height="16" fill="#2e7d32" rx="4"/>
  </g>
);

const SnowScene = () => (
  <g>
    <defs><linearGradient id="snwg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7ab3d4"/><stop offset="100%" stopColor="#d6eaf8"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#snwg)"/>
    {Array.from({length:20}).map((_,i)=><text key={i} x={8+i*16} y={14+((i*21)%55)} fontSize="11" fill="white" opacity="0.7">❄</text>)}
    <ellipse cx="75" cy="30" rx="58" ry="23" fill="#eceff1" opacity="0.9"/>
    <ellipse cx="210" cy="26" rx="66" ry="21" fill="#cfd8dc" opacity="0.88"/>
    <rect x="0" y="94" width="52" height="66" fill="#37474f" opacity="0.88"/>
    <rect x="57" y="70" width="42" height="90" fill="#455a64" opacity="0.9"/>
    <rect x="104" y="102" width="36" height="58" fill="#37474f" opacity="0.85"/>
    <rect x="145" y="56" width="56" height="104" fill="#455a64" opacity="0.92"/>
    <rect x="206" y="80" width="46" height="80" fill="#37474f" opacity="0.88"/>
    <rect x="0" y="92" width="52" height="5" fill="white" opacity="0.92" rx="2"/>
    <rect x="57" y="68" width="42" height="5" fill="white" opacity="0.92" rx="2"/>
    <rect x="104" y="100" width="36" height="5" fill="white" opacity="0.92" rx="2"/>
    <rect x="145" y="54" width="56" height="5" fill="white" opacity="0.92" rx="2"/>
    <rect x="206" y="78" width="46" height="5" fill="white" opacity="0.92" rx="2"/>
    <ellipse cx="160" cy="158" rx="175" ry="10" fill="white" opacity="0.75"/>
    {[[8,104],[28,104],[8,118],[62,80],[82,80],[150,66],[172,66],[210,90]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="8" fill="#FFF9C4" opacity="0.88" rx="1"/>)}
    <circle cx="82" cy="126" r="6" fill="#FFCC80"/>
    <rect x="76" y="132" width="12" height="16" fill="#1565c0" rx="3"/>
    <line x1="76" y1="136" x2="68" y2="144" stroke="#1565c0" strokeWidth="4" strokeLinecap="round"/>
    <line x1="88" y1="136" x2="96" y2="144" stroke="#1565c0" strokeWidth="4" strokeLinecap="round"/>
    <line x1="78" y1="148" x2="75" y2="157" stroke="#1565c0" strokeWidth="4" strokeLinecap="round"/>
    <line x1="84" y1="148" x2="87" y2="157" stroke="#1565c0" strokeWidth="4" strokeLinecap="round"/>
  </g>
);

const FogScene = () => (
  <g>
    <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9e9e9e"/><stop offset="100%" stopColor="#e0e0e0"/></linearGradient></defs>
    <rect width="320" height="160" fill="url(#fg)"/>
    {[28,50,70,90,112,132].map((y,i)=><rect key={i} x="0" y={y} width="320" height="18" fill="white" opacity={0.1+i*0.045} rx="4"/>)}
    <rect x="0" y="92" width="52" height="68" fill="#546e7a" opacity="0.38"/>
    <rect x="57" y="70" width="42" height="90" fill="#607d8b" opacity="0.42"/>
    <rect x="145" y="56" width="56" height="104" fill="#546e7a" opacity="0.38"/>
    <rect x="206" y="80" width="46" height="80" fill="#607d8b" opacity="0.36"/>
  </g>
);

const SCENE_MAP = { sunny:SunnyScene, hot:HotScene, rain:RainScene, storm:StormScene, cloudy:CloudyScene, snow:SnowScene, fog:FogScene };

const WeatherScene = ({ weather }) => {
  if (!weather) return null;
  const tempC = weather.temp - 273.15;
  const scene = getScene(weather.weatherCode, tempC);
  const SceneComp = SCENE_MAP[scene] || SunnyScene;
  const tip = TIPS[scene] || TIPS.sunny;
  const label = LABELS[scene] || 'Clear Sky';

  return (
    <div className="scene-card">
      <div className="scene-header">
        <span className="scene-title">Today's Scene</span>
        <span className="scene-badge">{label}</span>
      </div>
      <div className="scene-svg-wrap">
        <svg viewBox="0 0 320 160" className="scene-svg" xmlns="http://www.w3.org/2000/svg">
          <SceneComp/>
        </svg>
      </div>
      <div className="scene-footer">
        <span className="scene-tip-icon">{tip.icon}</span>
        <span className="scene-tip-text">{tip.text}</span>
      </div>
    </div>
  );
};

export default WeatherScene;
