import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././index.css';
import { useTime } from '.././hooks/useTime';
import { useLocationByCoordinates } from '.././hooks/useLocation';
import { useWeather } from '.././hooks/useWeather';
import { useSettings } from '../hooks/useSettings';
import Header from '.././components/Header';
import WeatherChart from '.././components/WeatherChart/WetherChart';
import WeatherInfo from '.././components/WeatherInfo';
import DailyDataComponent from '.././components/DailyWeather/DailyDataComponent';
import { chartMapper } from '.././mappers/chartMapper';
import { windMapper } from '.././mappers/windMapper';
import { headerMapper } from '.././mappers/headerMapper';
import { infoMapper } from '.././mappers/infoMapper';
import { weekWeatherMapper } from '.././mappers/weekWeatherMapper';

const DEFAULT_UNITS = {
    time: '24h',
    wind: 'ms',
    temperature: 'C',
    precipitation: 'mm',
};

function MainPage() {
    const navigate = useNavigate();

    const [selection, setSelection] = useState({
        mode: 'current', // 'current' or 'custom hour' or 'custom day'
        index: null,  // hour index
        chartIndex: null, // hour index for charts
        dayIndex: null,
        activeDayIndex: null
    });

    const settingsValues = useSettings();

    useEffect(() => {
        if (settingsValues.isLoaded && settingsValues.isFirstRun) {
            navigate("/settings");
        }
    }, [settingsValues.isLoaded, settingsValues.isFirstRun, navigate]);

    const rawLat = settingsValues.settings?.latitude;
    const rawLon = settingsValues.settings?.longitude;

    const lat = rawLat === '' || rawLat === null || rawLat === undefined ? null : Number(rawLat);
    const lon = rawLon === '' || rawLon === null || rawLon === undefined ? null : Number(rawLon);

    const hasValidCoords =
        lat !== null && lon !== null &&
        Number.isFinite(lat) && Number.isFinite(lon) &&
        !(lat === 0 && lon === 0);

    const weather = useWeather(hasValidCoords ? lat : null, hasValidCoords ? lon : null, 7, 14);
    const locationByCoordinates = useLocationByCoordinates(hasValidCoords ? lat : null, hasValidCoords ? lon : null);
    const time = useTime(hasValidCoords ? lat : null, hasValidCoords ? lon : null, 7, 14);


    if (
        !settingsValues.isLoaded ||
        !hasValidCoords ||
        weather.loading || !weather.data ||
        locationByCoordinates.loading || !locationByCoordinates.data ||
        time.loading || !time.data
    ) {
        return (<div className="app">
            {hasValidCoords ? "Loading..." : "Error: no data"}
        </div>);
    }

    console.log("-----------------------------------------------------------------------:");

    console.log("weather:");
    console.log(weather.data);
    console.log("locationByCoordinates: ");
    console.log(locationByCoordinates.data);
    console.log("time: ");
    console.log(time.data);

    console.log("Lan:" + lat);
    console.log("Lon:" + lon);

    console.log("-----------------------------------------------------------------------:");

    const units = settingsValues.settings.units;

    const headerData = headerMapper.getHeaderData(locationByCoordinates.data, time.data, "24h");
    const dailyWeatherData = weekWeatherMapper.getWeekData(weather.data, time.data, "C");

    const tempForm = (value) => chartMapper.tempFormatter(value, "C");
    const precipProbabilityForm = (value) => chartMapper.precipProbabilityFormatter(value);

    let weatherInfoData = infoMapper.getWeatherData(selection, weather.data, units.temperature, units.precipitation, units.wind);
    let dataForLineChart = chartMapper.getTempChartData(selection, weather.data, units.temperature, units.time);
    let dataForBarChart = chartMapper.getPrecipProbabilityChartData(selection, weather.data, units.precipitation, units.time);
    let dataForWindChart = windMapper.getWindChartData(selection, weather.data, units.wind, units.time);

    const handleDaySelect = (payload) => {
        console.log("dayIndex:" + payload.dayIndex);
        setSelection({
            mode: 'custom day',
            index: payload.index,
            dayIndex: payload.dayIndex,
            chartIndex: payload.index,
            activeDayIndex: payload.dayIndex
        });
    };

    const handlePointSelect = (payload) => {
        setSelection({
            mode: 'custom hour',
            index: payload.index,
            dayIndex: selection.dayIndex,
            chartIndex: selection.chartIndex,
            activeDayIndex: selection.dayIndex
        });
    };


    return (<div className="app">
        <Header
            data={headerData}
            navigationToSettings={() => { navigate("/settings") }} />
        <WeatherInfo
            data={weatherInfoData}
        />
        <WeatherChart
            onPointSelect={handlePointSelect}
            tempData={dataForLineChart}
            precipData={dataForBarChart}
            windData={dataForWindChart}
            tempFormatter={tempForm}
            precipFormatter={precipProbabilityForm}
        />
        <DailyDataComponent
            weekData={dailyWeatherData}
            todayIndex={weather.data.input.pastDays}
            selectedIndex={selection.activeDayIndex === null ? weather.data.input.pastDays : selection.activeDayIndex}
            onPointSelect={handleDaySelect}
        />
    </div>);
}

export default MainPage;
