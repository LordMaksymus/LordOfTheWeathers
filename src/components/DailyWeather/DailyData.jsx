import React from 'react';
import '../../index.css';

function DailyData({ data, onClick, isSelected }) {
  const { dayOfWeek, month, icon, maxTemp, minTemp } = data; // .active 

  return (
    <div className={`daily-data-card ${isSelected ? 'active' : ''}`} onClick={onClick}>
      <div className="daily-data-day-wrapper">
        <span className="daily-data-day-name">{dayOfWeek}</span>
        <span className="daily-data-day-month">{month}</span>
      </div>
      <img
        className='daily-data-icon'
        src={icon}
        alt={`${dayOfWeek} weather icon`}
      />

      <div className="daily-data-temps">
        <span className="daily-data-max">{Math.round(maxTemp)}°</span>
        <span className="daily-data-min">{Math.round(minTemp)}°</span>
      </div>
    </div>
  );
}

export default DailyData;
