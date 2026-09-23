import React from 'react';
import '../index.css';

function Header({ data, navigationToSettings }) {
  return (
    <div className="header">
      <div className="header-left">
        <button className="settings-btn" aria-label="Settings"
          onClick={navigationToSettings}>
          <img src={data.settingsIcon} alt="Settings" className="settings-icon" />
        </button>
        <span className="header-location">
          {data.town} {data.region} {data.country}
        </span>
      </div>

      <div className="header-date">
        {data.dayOfWeek} {data.month} {data.dayOfMonth} {data.time}
      </div>
    </div>
  );
}

export default Header;