import React from 'react';
import '../index.css';

const uvColorMap = {
  "Low": "uv-low",
  "Moderate": "uv-moderate",
  "High": "uv-high",
  "Very high": "uv-very-high",
  "Extreme": "uv-extreme",
};

function WeatherInfo({ data }) {
  const uvClass = uvColorMap[data.uvIndex] || "";

  return (
    <div className="weather-info">
      <div className="weather-info-primary">
        <img src={data.icon} alt="Weather icon" className="weather-info-icon" />
        <span className="weather-info-temp">
          {data.temperature}{data.unitOfTemperature}
        </span>
      </div>

      <div className="weather-info-stats">
        <span className="weather-info-label">Humidity</span>
        <span className="weather-info-value">{data.humidity}{data.unitOfHumidity}</span>
        <span className="weather-info-label col-break">Apparent Temp</span>
        <span className="weather-info-value">{data.apparentTemp}{data.unitOfApparentTemperature}</span>

        <span className="weather-info-label">Precipitation</span>
        <span className="weather-info-value">{data.precipitation}{data.unitOfPrecipitation}</span>
        <span className="weather-info-label col-break">Cloud Cover</span>
        <span className="weather-info-value">{data.cloudCover}{data.unitOfCloudCover}</span>

        <span className="weather-info-label">Wind</span>
        <span className="weather-info-value">{data.wind}{data.unitOfWind}</span>
        <span className="weather-info-label col-break">UV Index</span>
        <span className={`weather-info-value uv-value ${uvClass}`}>{data.uvIndex}</span>
      </div>
    </div>
  );
}

export default WeatherInfo;