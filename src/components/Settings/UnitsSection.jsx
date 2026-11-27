import React from 'react';

const UNIT_GROUPS = [
    { key: 'temperature', label: 'Temperature', iconKey: 'tempIcon', options: [
        { value: 'C', label: '°C' }, { value: 'F', label: '°F' },
    ] },
    { key: 'precipitation', label: 'Precipitation', iconKey: 'precipitationIcon', options: [
        { value: 'mm', label: 'mm' }, { value: 'in', label: 'in' },
    ] },
    { key: 'time', label: 'Time format', iconKey: 'timeIcon', options: [
        { value: '12h', label: '12h' }, { value: '24h', label: '24h' },
    ] },
    { key: 'wind', label: 'Wind speed', iconKey: 'windIcon', options: [
        { value: 'ms', label: 'm/s' }, { value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' },
    ] },
];

function UnitsSection({ data, units, onUnitsChange }) {
    return (
        <section className="settings-section units-section" aria-labelledby="units-heading">
            <h2 id="units-heading">Units</h2>
            <div className="units-list">
                {UNIT_GROUPS.map(group => (
                    <div className="units-row" key={group.key}>
                        <div className="units-row-label" id={'unit-' + group.key}>
                            <img src={data[group.iconKey]} alt="" />
                            {group.label}
                        </div>
                        <div className="segmented" role="radiogroup" aria-labelledby={'unit-' + group.key}>
                            {group.options.map(option => (
                                <label className="segmented-item" key={option.value}>
                                    <input
                                        type="radio"
                                        name={group.key}
                                        value={option.value}
                                        checked={units[group.key] === option.value}
                                        onChange={() => onUnitsChange(previous => ({ ...previous, [group.key]: option.value }))}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UnitsSection;
