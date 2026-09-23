import React from 'react';
import "../../index.css";

export const WindComponent = ({ data, isNow, isHighlighted, index = 0, onClick }) => {
  // data — это уже конкретный объект (entry), который мы передали выше
  if (!data) return null;

  return (
    <div
      className={`wind-hour ${isHighlighted ? "highlight" : ""}`}
      style={{ animationDelay: `${index * 40}ms`, cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="wind-icons">
        <div className="wind-speed">{data.windSpeed}</div>

        <img
          className="wind-arrow-icon"
          src={data.windDirectionIcon}
          alt="Wind direction"
          style={{ transform: `rotate(${data.windDirectionDegrees ?? 0}deg)` }}
        />

        {data.windForceIcon && (
          <img
            className="wind-force-icon"
            src={data.windForceIcon}
            alt="Wind force"
          />
        )}
      </div>

      <div className={"wind-time" + (isNow ? " now" : "")}>
        {isNow ? "Now" : data.time}
      </div>
    </div>
  );
}

export default WindComponent;

