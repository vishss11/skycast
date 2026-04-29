import React from 'react';
import './Sidebar.css';

const NAV = [
  { id: 'home', icon: '🏠', label: 'Dashboard' },
  { id: 'compare', icon: '🌍', label: 'Compare' },
  { id: 'favourites', icon: '⭐', label: 'Favourites' },
];

const Sidebar = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">🌤️</span>
      </div>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-tooltip">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Theme toggle at bottom */}
      <div className="sidebar-bottom">
        <button
          className="theme-btn"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="nav-tooltip">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
