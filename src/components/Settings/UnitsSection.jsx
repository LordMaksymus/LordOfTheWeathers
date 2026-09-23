import React from 'react';
import '../../index.css';

const UNIT_GROUPS = [
    {
        key: 'temperature', label: 'Temperature', description: 'Defines the temperature unit', iconKey: 'tempIcon', options: [
            { value: 'C', label: '°C' },
            { value: 'F', label: '°F' },
        ]
    },
    {
        key: 'precipitation', label: 'Precipitation', description: 'Defines the precipitation unit', iconKey: 'precipitationIcon', options: [
            { value: 'mm', label: 'mm' },
            { value: 'in', label: 'in' },
        ]
    },
    {
        key: 'time', label: 'Time format', description: 'Defines the clock display format', iconKey: 'timeIcon', options: [
            { value: '12h', label: '12h' },
            { value: '24h', label: '24h' },
        ]
    },
    {
        key: 'wind', label: 'Wind speed', description: 'Defines the wind speed unit', iconKey: 'windIcon', options: [
            { value: 'ms', label: 'm/s' },
            { value: 'kmh', label: 'km/h' },
            { value: 'mph', label: 'mph' },
        ]
    },
];

function UnitsSection({ data, units, onUnitsChange }) {
    const handleSelect = (groupKey, value) => {
        onUnitsChange((prev) => ({ ...prev, [groupKey]: value }));
    };

    return (
        <div className="settings-section units-section">
            <div className="settings-section-title">Units</div>

            <div className="units-list">
                {UNIT_GROUPS.map((group) => (
                    <div key={group.key} className="units-row">
                        <div className="units-row-label">
                            {data[group.iconKey] && (
                                <img src={data[group.iconKey]} alt="" className="units-row-icon" />
                            )}
                            <div className="units-row-text">
                                <span className="units-row-title">{group.label}</span>
                                <span className="units-row-desc">{group.description}</span>
                            </div>
                        </div>
                        <div className="segmented">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`segmented-item ${units[group.key] === opt.value ? 'active' : ''}`}
                                    onClick={() => handleSelect(group.key, opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnitsSection;