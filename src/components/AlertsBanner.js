import React, { useState } from 'react';
import './AlertsBanner.css';

const AlertsBanner = ({ alerts }) => {
  const [dismissed, setDismissed] = useState([]);
  const visible = alerts.filter((_, i) => !dismissed.includes(i));
  if (visible.length === 0) return null;

  return (
    <div className="alerts-wrapper">
      {visible.map((alert, i) => (
        <div key={i} className={`alert-item alert-${alert.type}`}>
          <span className="alert-msg">{alert.msg}</span>
          <button className="alert-close" onClick={() => setDismissed(d => [...d, alerts.indexOf(alert)])}>✕</button>
        </div>
      ))}
    </div>
  );
};

export default AlertsBanner;
