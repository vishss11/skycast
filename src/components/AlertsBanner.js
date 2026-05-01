import React, { useState } from 'react';
import './AlertsBanner.css';

const AlertsBanner = ({ alerts }) => {
  const [dismissed, setDismissed] = useState([]);

  const visible = alerts.filter(a => !dismissed.includes(a.msg));
  if (visible.length === 0) return null;

  return (
    <div className="alerts-wrapper">
      {visible.map((alert) => (
        <div key={alert.msg} className={`alert-item alert-${alert.type}`}>
          <span className="alert-msg">{alert.msg}</span>
          <button
            className="alert-close"
            onClick={() => setDismissed(d => [...d, alert.msg])}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertsBanner;