import React from 'react';

const LOCATION_METHODS = [
    { key: 'geo', label: 'Geolocation', selectedIcon: 'selectedGeoIcon', idleIcon: 'notSelectedGeoIcon' },
    { key: 'city', label: 'City', selectedIcon: 'selectedCityIcon', idleIcon: 'notSelectedCityIcon' },
    { key: 'coordinates', label: 'Coordinates', selectedIcon: 'selectedCoorIcon', idleIcon: 'notSelectedCoorIcon' },
];

function describePosition(position) {
    if (!position) return 'Allow the browser to find your current position.';

    const coordinates = position.latitude.toFixed(4) + ', ' + position.longitude.toFixed(4);
    if (position.accuracy === undefined) return 'Saved position: ' + coordinates;

    const accuracy = position.accuracy < 1000
        ? Math.ceil(position.accuracy) + ' m'
        : (position.accuracy / 1000).toFixed(1) + ' km';
    return 'Browser position: ' + coordinates + '. Reported accuracy: ' + accuracy + '.';
}

function LocationField({ name, label, value, onChange, error, placeholder, inputMode }) {
    return (
        <div className="settings-field">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                className="settings-input"
                placeholder={placeholder}
                inputMode={inputMode}
                autoComplete="off"
                value={value}
                onChange={event => onChange(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? name + '-error' : undefined}
            />
            {error && <p id={name + '-error'} className="field-error" role="alert">{error}</p>}
        </div>
    );
}

function LocationSection({
    data, method, onMethodChange, city, onCityChange, latitude, longitude,
    onLatitudeChange, onLongitudeChange, geoPosition, onLocate, errors,
}) {
    return (
        <section className="settings-section location-section" aria-labelledby="location-heading">
            <h2 id="location-heading">Location</h2>
            <div className="location-options" role="radiogroup" aria-label="Location method">
                {LOCATION_METHODS.map(option => (
                    <label className="location-option" key={option.key}>
                        <input
                            type="radio"
                            name="location-method"
                            value={option.key}
                            checked={method === option.key}
                            onChange={() => onMethodChange(option.key)}
                        />
                        <span className="location-option-content">
                            <img src={data[method === option.key ? option.selectedIcon : option.idleIcon]} alt="" />
                            <span>{option.label}</span>
                        </span>
                    </label>
                ))}
            </div>

            <div className="location-input-zone">
                {method === 'city' && (
                    <LocationField
                        name="city" label="City name" placeholder="e.g. Berlin"
                        value={city} onChange={onCityChange} error={errors.city}
                    />
                )}
                {method === 'coordinates' && (
                    <div className="coordinates-row">
                        <LocationField
                            name="latitude" label="Latitude" placeholder="e.g. 52.52" inputMode="decimal"
                            value={latitude} onChange={onLatitudeChange} error={errors.latitude}
                        />
                        <LocationField
                            name="longitude" label="Longitude" placeholder="e.g. 13.40" inputMode="decimal"
                            value={longitude} onChange={onLongitudeChange} error={errors.longitude}
                        />
                    </div>
                )}
                {method === 'geo' && (
                    <div className="geo-settings">
                        <p className="location-hint" aria-live="polite">
                            {describePosition(geoPosition)}
                            {geoPosition?.accuracy !== undefined && ' Check the position before using it.'}
                        </p>
                        {errors.geo && <p className="field-error" role="alert">{errors.geo}</p>}
                        <button type="button" className="secondary-button" onClick={onLocate}>
                            {errors.geo || geoPosition?.accuracy !== undefined
                                ? 'Try again' : geoPosition ? 'Update location' : 'Find my location'}
                        </button>
                        <button type="button" className="secondary-button" onClick={() => onMethodChange('coordinates')}>
                            Enter coordinates
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default LocationSection;
