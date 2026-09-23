export const getWeather = async (lat, lon, pastDays, forecastDays) => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
        '&daily=temperature_2m_max,relative_humidity_2m_mean,weather_code,sunrise,sunset,uv_index_max,wind_speed_10m_max,apparent_temperature_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours' +
        '&hourly=temperature_2m,wind_direction_10m,weather_code,relative_humidity_2m,apparent_temperature,precipitation,precipitation_probability,rain,showers,snowfall,snow_depth,cloud_cover,visibility,wind_speed_10m,uv_index' +
        '&current=is_day,weather_code,rain,showers,apparent_temperature,relative_humidity_2m,cloud_cover,precipitation,snowfall,temperature_2m,wind_speed_10m,wind_direction_10m' +
        '&timezone=auto&past_days=' + pastDays + '&forecast_days=' + forecastDays + '&wind_speed_unit=ms');//time zone change

    if (!response.ok) throw new Error('Net Error');
    return await response.json();
}