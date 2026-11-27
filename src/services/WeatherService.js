import { fetchJson, RequestError } from './fetchJson';

const CURRENT_FIELDS = [
    'is_day', 'weather_code', 'rain', 'showers', 'apparent_temperature', 'relative_humidity_2m',
    'cloud_cover', 'precipitation', 'snowfall', 'temperature_2m', 'wind_speed_10m', 'wind_direction_10m',
];
const HOURLY_FIELDS = [
    'temperature_2m', 'wind_direction_10m', 'weather_code', 'relative_humidity_2m', 'apparent_temperature',
    'precipitation', 'precipitation_probability', 'rain', 'showers', 'snowfall', 'snow_depth', 'cloud_cover',
    'visibility', 'wind_speed_10m', 'uv_index',
];
const DAILY_FIELDS = [
    'temperature_2m_max', 'relative_humidity_2m_mean', 'weather_code', 'sunrise', 'sunset', 'uv_index_max',
    'wind_speed_10m_max', 'apparent_temperature_max', 'temperature_2m_min', 'rain_sum', 'showers_sum',
    'snowfall_sum', 'precipitation_sum', 'precipitation_hours',
];

const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value));
const isDateTime = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value + 'Z'));

function validSeries(series, fields, count, validTime) {
    return Array.isArray(series?.time) && series.time.length === count && series.time.every(validTime)
        && fields.every(field => {
            const values = series[field];
            const validValue = field === 'sunrise' || field === 'sunset' ? isDateTime : Number.isFinite;
            return Array.isArray(values) && values.length === count
                && values.every(value => value === null || validValue(value));
        });
}

export async function getWeather(lat, lon, pastDays, forecastDays, signal) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        daily: DAILY_FIELDS.join(','),
        hourly: HOURLY_FIELDS.join(','),
        current: CURRENT_FIELDS.join(','),
        timezone: 'auto',
        past_days: pastDays,
        forecast_days: forecastDays,
        wind_speed_unit: 'ms',
    });

    const data = await fetchJson('https://api.open-meteo.com/v1/forecast?' + params, signal);
    const days = pastDays + forecastDays;
    if (!isDateTime(data?.current?.time) || !Number.isFinite(data.current.temperature_2m)
        || !CURRENT_FIELDS.every(field => data.current[field] === null || Number.isFinite(data.current[field]))
        || !validSeries(data.hourly, HOURLY_FIELDS, days * 24, isDateTime)
        || !validSeries(data.daily, DAILY_FIELDS, days, isDate)) {
        throw new RequestError('invalid-response');
    }

    return data;
}
