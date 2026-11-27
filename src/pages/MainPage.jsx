import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationByCoordinates } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { ErrorScreen, LoadingScreen } from '../components/PopupStatus';
import Header from '../components/Header';
import WeatherChart from '../components/WeatherChart/WetherChart';
import WeatherInfo from '../components/WeatherInfo';
import DailyDataComponent from '../components/DailyWeather/DailyDataComponent';
import { chartMapper } from '../mappers/chartMapper';
import { windMapper } from '../mappers/windMapper';
import { headerMapper } from '../mappers/headerMapper';
import { infoMapper } from '../mappers/infoMapper';
import { weekWeatherMapper } from '../mappers/weekWeatherMapper';
import { describeRequestError } from '../services/fetchJson';
import { validateCoordinates } from '../utils/coordinates';

function MainPage({ settings }) {
    const navigate = useNavigate();
    const openSettings = () => navigate('/settings');
    const [selection, setSelection] = useState({
        mode: 'current',
        index: null,
        chartIndex: null,
        dayIndex: null,
        activeDayIndex: null,
    });

    const { units, locationMethod, city } = settings;
    const { coordinates } = validateCoordinates(settings.latitude, settings.longitude);
    const lat = coordinates?.latitude;
    const lon = coordinates?.longitude;
    const weather = useWeather(lat, lon, 7, 14);
    const lookupAddress = !(locationMethod === 'city' && city);
    const location = useLocationByCoordinates(lookupAddress ? lat : null, lookupAddress ? lon : null);

    if (!coordinates) {
        return <ErrorScreen title="Location required" message="Choose a location to see its forecast." onOpenSettings={openSettings} />;
    }

    if (weather.error) {
        return (
            <ErrorScreen
                title="Forecast unavailable"
                message={describeRequestError(weather.error, 'weather')}
                onRetry={weather.retry}
                onOpenSettings={openSettings}
            />
        );
    }

    if (weather.loading) return <LoadingScreen message="Loading forecast…" />;

    const fallbackLocation = locationMethod === 'city' && city
        ? city
        : lat.toFixed(4) + ', ' + lon.toFixed(4);
    const headerData = headerMapper.getHeaderData(location.data, fallbackLocation, weather.data, units.time);
    const weekData = weekWeatherMapper.getWeekData(weather.data, units.temperature);
    const weatherInfo = infoMapper.getWeatherData(selection, weather.data, units.temperature, units.precipitation, units.wind);

    const handleDaySelect = ({ index, dayIndex }) => {
        setSelection({
            mode: 'custom day',
            index,
            dayIndex,
            chartIndex: index,
            activeDayIndex: dayIndex,
        });
    };

    const handlePointSelect = point => {
        if (!point) return;
        setSelection(previous => ({
            ...previous,
            mode: 'custom hour',
            index: point.index,
            activeDayIndex: previous.dayIndex,
        }));
    };

    return (
        <div className="app">
            <Header data={headerData} navigationToSettings={openSettings} />
            <WeatherInfo data={weatherInfo} />
            <WeatherChart
                onPointSelect={handlePointSelect}
                tempData={chartMapper.getTempChartData(selection, weather.data, units.temperature, units.time)}
                precipData={chartMapper.getPrecipProbabilityChartData(selection, weather.data, units.time)}
                windData={windMapper.getWindChartData(selection, weather.data, units.wind, units.time)}
                tempFormatter={value => chartMapper.tempFormatter(value, units.temperature)}
                precipFormatter={chartMapper.precipProbabilityFormatter}
            />
            <DailyDataComponent
                weekData={weekData}
                todayIndex={weather.data.input.pastDays}
                selectedIndex={selection.activeDayIndex ?? weather.data.input.pastDays}
                onPointSelect={handleDaySelect}
            />
        </div>
    );
}

export default MainPage;
