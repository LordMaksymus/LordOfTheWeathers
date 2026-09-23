import { useState, useEffect } from 'react';
import { getWeather } from '../services/WeatherService';
import { WeatherTransformer } from '../transformers/WeatherTransformer';

export const useWeather = (lat, lon, pastDays, forecastDays) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (lat === null || lon === null) return;
        const fetchAndTransform = async () => {
            try {
                setLoading(true);
                const rawData = await getWeather(lat, lon, pastDays, forecastDays);

                const processedData = {
                    input: {
                        lat: lat,
                        lon: lon,
                        pastDays: pastDays,
                        forecastDays: forecastDays
                    },
                    current: {
                        temp: WeatherTransformer.getCurrentTemperature(rawData),
                        isDay: WeatherTransformer.getCurrentIsDay(rawData),
                        windDirection: WeatherTransformer.getCurrentWindDirection(rawData),
                        windSpeed: WeatherTransformer.getCurrentWindSpeed(rawData),
                        rain: WeatherTransformer.getCurrentRain(rawData),
                        showers: WeatherTransformer.getCurrentShowers(rawData),
                        snowfall: WeatherTransformer.getCurrentSnowfall(rawData),
                        precipitation: WeatherTransformer.getCurrentPrecipitation(rawData),
                        cloudCover: WeatherTransformer.getCurrentCloudCover(rawData),
                        humidity: WeatherTransformer.getCurrentHumidity(rawData),
                        apparentTemp: WeatherTransformer.getCurrentApparentTemperature(rawData),
                        weatherCode: WeatherTransformer.getCurrentWeatherCode(rawData),
                        time: WeatherTransformer.getCurrentTime(rawData)
                    },

                    getHourly: (hour) => ({
                        temp: WeatherTransformer.getHourlyTemperature(rawData, hour),
                        weatherCode: WeatherTransformer.getHourlyWeatherCode(rawData, hour),
                        apparentTemp: WeatherTransformer.getHourlyApparentTemperature(rawData, hour),
                        cloudCover: WeatherTransformer.getHourlyCloudCover(rawData, hour),
                        precipitation: WeatherTransformer.getHourlyPrecipitation(rawData, hour),
                        precipitationProbability: WeatherTransformer.getHourlyPrecipitationProbability(rawData, hour),
                        rain: WeatherTransformer.getHourlyRain(rawData, hour),
                        humidity: WeatherTransformer.getHourlyRelativeHumidity(rawData, hour),
                        showers: WeatherTransformer.getHourlyShowers(rawData, hour),
                        snowDepth: WeatherTransformer.getHourlySnowDepth(rawData, hour),
                        snowfall: WeatherTransformer.getHourlySnowfall(rawData, hour),
                        uvIndex: WeatherTransformer.getHourlyUvIndex(rawData, hour),
                        visibility: WeatherTransformer.getHourlyVisibility(rawData, hour),
                        windSpeed: WeatherTransformer.getHourlyWindSpeed(rawData, hour),
                        windDirection: WeatherTransformer.getHourlyWindDirection(rawData, hour),
                        time: WeatherTransformer.getHourlyTime(rawData, hour)
                    }),

                    getDaily: (day) => ({
                        time: WeatherTransformer.getDailyTime(rawData, day),
                        maxTemp: WeatherTransformer.getDailyMaxTemperature(rawData, day),
                        minTemp: WeatherTransformer.getDailyMinTemperature(rawData, day),
                        precipHours: WeatherTransformer.getDailyPrecipitationHours(rawData, day),
                        precipSum: WeatherTransformer.getDailyPrecipitationSum(rawData, day),
                        rainSum: WeatherTransformer.getDailyRainSum(rawData, day),
                        showersSum: WeatherTransformer.getDailyShowersSum(rawData, day),
                        snowfallSum: WeatherTransformer.getDailySnowfallSum(rawData, day),
                        sunrise: WeatherTransformer.getDailySunrise(rawData, day),
                        sunset: WeatherTransformer.getDailySunset(rawData, day),
                        maxUvIndex: WeatherTransformer.getDailyMaxUvIndex(rawData, day),
                        weatherCode: WeatherTransformer.getDailyWeatherCode(rawData, day),
                        maxWindSpeed: WeatherTransformer.getDailyMaxWindSpeed(rawData, day),
                        maxApparentTemp: WeatherTransformer.getDailyMaxApparentTemperature(rawData, day)
                    })
                };

                setData(processedData);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAndTransform();
    }, [lat, lon, pastDays, forecastDays]);

    return { data, loading };
}