import React from 'react';
import '../../index.css';

const LOCATION_METHODS = [
    { key: 'geo', label: 'Geolocation', description: 'Use browser permission' },
    { key: 'city', label: 'City', description: 'Enter a city name' },
    { key: 'coordinates', label: 'Coordinates', description: 'Enter latitude & longitude' },
];

function LocationSection({
    data,
    method,
    onMethodChange,
    city,
    onCityChange,
    latitude,
    longitude,
    onLatitudeChange,
    onLongitudeChange,
}) {
    const iconFor = (key) => {
        const isSelected = method === key;
        if (key === 'geo') return isSelected ? data.selectedGeoIcon : data.notSelectedGeoIcon;
        if (key === 'city') return isSelected ? data.selectedCityIcon : data.notSelectedCityIcon;
        return isSelected ? data.selectedCoorIcon : data.notSelectedCoorIcon;
    };

    return (
        <div className="settings-section location-section">
            <div className="settings-section-title">Location</div>

            <div className="location-options">
                {LOCATION_METHODS.map((option) => (
                    <button
                        key={option.key}
                        type="button"
                        className={`location-option ${method === option.key ? 'active' : ''}`}
                        onClick={() => onMethodChange(option.key)}
                    >
                        <img src={iconFor(option.key)} alt=" " className="location-option-icon" />
                        <div className="location-option-text">
                            <span className="location-option-title">{option.label}</span>
                            <span className="location-option-desc">{option.description}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="location-input-zone">
                {method === 'city' && (
                    <input
                        type="text"
                        className="settings-input"
                        placeholder="City name"
                        value={city}
                        onChange={(e) => onCityChange(e.target.value)}
                    />
                )}

                {method === 'coordinates' && (
                    <div className="coordinates-row">
                        <input
                            type="number"
                            step="0.0001"
                            className="settings-input"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={(e) => onLatitudeChange(e.target.value)}
                        />
                        <input
                            type="number"
                            step="0.0001"
                            className="settings-input"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={(e) => onLongitudeChange(e.target.value)}
                        />
                    </div>
                )}

                {method === 'geo' && (
                    <p className="location-hint">
                        Your current location will be requested when you continue.
                    </p>
                )}
            </div>
        </div>
    );
}

export default LocationSection;