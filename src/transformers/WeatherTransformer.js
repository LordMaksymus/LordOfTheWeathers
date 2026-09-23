export const WeatherTransformer = {
    getLatitude(data) {
        return data?.latitude ?? null;
    },
    getLongitude(data) {
        return data?.latitude ?? null;
    },

    getCurrentTemperature(data) {
        return data?.current?.temperature_2m ?? null;
    },
    getCurrentIsDay(data) {
        return data?.current?.is_day ?? null;
    },
    getCurrentWindDirection(data) {
        return data?.current?.wind_direction_10m ?? null;
    },
    getCurrentWindSpeed(data) {
        return data?.current?.wind_speed_10m ?? null;
    },
    getCurrentRain(data) {
        return data?.current?.rain ?? null;
    },
    getCurrentShowers(data) {
        return data?.current?.showers ?? null;
    },
    getCurrentSnowfall(data) {
        return data?.current?.snowfall ?? null;
    },
    getCurrentPrecipitation(data) {
        return data?.current?.precipitation ?? null;
    },
    getCurrentCloudCover(data) {
        return data?.current?.cloud_cover ?? null;
    },
    getCurrentApparentTemperature(data) {
        return data?.current?.apparent_temperature ?? null;
    },
    getCurrentWeatherCode(data) {
        return data?.current?.weather_code ?? null;
    },
    getCurrentTime(data) {
        return data?.current?.time ?? null;
    },
    getCurrentHumidity(data) {
        return data?.current?.relative_humidity_2m ?? null;
    },

    getHourlyTime(data, hour) {
        return data?.hourly?.time?.[hour] ?? null;
    },
    getHourlyTemperature(data, hour) {
        return data?.hourly?.temperature_2m?.[hour] ?? null;
    },
    getHourlyApparentTemperature(data, hour) {
        return data?.hourly?.apparent_temperature?.[hour] ?? null;
    },
    getHourlyCloudCover(data, hour) {
        return data?.hourly?.cloud_cover?.[hour] ?? null;
    },
    getHourlyPrecipitation(data, hour) {
        return data?.hourly?.precipitation?.[hour] ?? null;
    },
    getHourlyPrecipitationProbability(data, hour) {
        return data?.hourly?.precipitation_probability?.[hour] ?? null;
    },
    getHourlyRain(data, hour) {
        return data?.hourly?.rain?.[hour] ?? null;
    },
    getHourlyRelativeHumidity(data, hour) {
        return data?.hourly?.relative_humidity_2m?.[hour] ?? null;
    },
    getHourlyShowers(data, hour) {
        return data?.hourly?.showers?.[hour] ?? null;
    },
    getHourlySnowDepth(data, hour) {
        return data?.hourly?.snow_depth?.[hour] ?? null;
    },
    getHourlySnowfall(data, hour) {
        return data?.hourly?.snowfall?.[hour] ?? null;
    },
    getHourlyUvIndex(data, hour) {
        return data?.hourly?.uv_index?.[hour] ?? null;
    },
    getHourlyVisibility(data, hour) {
        return data?.hourly?.visibility?.[hour] ?? null;
    },
    getHourlyWindSpeed(data, hour) {
        return data?.hourly?.wind_speed_10m?.[hour] ?? null;
    },
    getHourlyWindDirection(data, hour) {
        return data?.hourly?.wind_direction_10m?.[hour] ?? null;
    },
    getHourlyWeatherCode(data, hour) {
        return data?.hourly?.weather_code?.[hour] ?? null;
    },

    getDailyTime(data, day) {
        return data?.daily?.time?.[day] ?? null;
    },
    getDailyMaxTemperature(data, day) {
        return data?.daily?.temperature_2m_max?.[day] ?? null;
    },
    getDailyMinTemperature(data, day) {
        return data?.daily?.temperature_2m_min?.[day] ?? null;
    },
    getDailyPrecipitationHours(data, day) {
        return data?.daily?.precipitation_hours?.[day] ?? null;
    },
    getDailyPrecipitationSum(data, day) {
        return data?.daily?.precipitation_sum?.[day] ?? null;
    },
    getDailyRainSum(data, day) {
        return data?.daily?.rain_sum?.[day] ?? null;
    },
    getDailyShowersSum(data, day) {
        return data?.daily?.showers_sum?.[day] ?? null;
    },
    getDailySnowfallSum(data, day) {
        return data?.daily?.snowfall_sum?.[day] ?? null;
    },
    getDailySunrise(data, day) {
        return data?.daily?.sunrise?.[day] ?? null;
    },
    getDailySunset(data, day) {
        return data?.daily?.sunset?.[day] ?? null;
    },
    getDailyMaxUvIndex(data, day) {
        return data?.daily?.uv_index_max?.[day] ?? null;
    },
    getDailyWeatherCode(data, day) {
        return data?.daily?.weather_code?.[day] ?? null;
    },
    getDailyMaxWindSpeed(data, day) {
        return data?.daily?.wind_speed_10m_max?.[day] ?? null;
    },
    getDailyMaxApparentTemperature(data, day) {
        return data?.daily?.apparent_temperature_max?.[day] ?? null;
    }

}