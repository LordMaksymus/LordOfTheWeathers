import React, { useState } from 'react';
import '../../index.css';
import { LineChartComponent } from './LineChartComponent'
import { PrecipitationAreaChart } from './PrecipitationAreaChart';
import { WindChartComponent } from './WindChartComponent';

const TABS = [
    { key: 'temp', label: 'Temperature' },
    { key: 'precip', label: 'Precipitation' },
    { key: 'wind', label: 'Wind' },
];

export const WeatherChart = ({
    tempData,
    precipData,
    windData,
    onPointSelect,
    tempFormatter = null,
    precipFormatter = null,
}) => {
    const [activeTab, setActiveTab] = useState('temp');

    return (
        <div className="weather-chart-wrapper">
            <div className="chart-tabs">
                {TABS.map((tab, index) => (
                    <React.Fragment key={tab.key}>
                        {index > 0 && <span className="chart-tab-divider">|</span>}
                        <button
                            className={
                                "chart-tab" + (activeTab === tab.key ? " active" : "")
                            }
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    </React.Fragment>
                ))}
            </div>

            <div className="chart-container">
                {activeTab === 'temp' && (
                    <LineChartComponent key={tempData.map(d => d.temp).join('')} data={tempData} formatter={tempFormatter} onSelect={onPointSelect}/>
                )}
                {activeTab === 'precip' && (
                    <PrecipitationAreaChart data={precipData} formatter={precipFormatter} onSelect={onPointSelect}/>
                )}
                {activeTab === 'wind' && (
                    <WindChartComponent data={windData} onSelect={onPointSelect}/>
                )}
            </div>
        </div>
    );
};

export default WeatherChart;