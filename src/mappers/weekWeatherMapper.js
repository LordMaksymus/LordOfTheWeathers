import { WeatherUnitUtil } from '../utils/weatherUnitUtil';
import { weatherMapper } from './weatherMapper';
import { dateUtil } from '../utils/dateUtil';

export const weekWeatherMapper = {
    getWeekData(data, unitOfTemperature) {
        return Array.from({ length: data.input.pastDays + data.input.forecastDays }, (_, day) => {
            const { time, maxTemp, minTemp } = data.getDaily(day);

            return {
                arrowLeftIcon: './assets/arrows/left-arrow.svg',
                arrowRightIcon: './assets/arrows/right-arrow.svg',
                icon: weatherMapper.getIconByDay(data, day),
                dayOfWeek: dateUtil.getWeekday(time, 'short'),
                month: dateUtil.getDayOfMonth(time) + ' ' + dateUtil.getCurrentMounth(time),
                maxTemp: WeatherUnitUtil.formatTemperature(maxTemp, unitOfTemperature),
                minTemp: WeatherUnitUtil.formatTemperature(minTemp, unitOfTemperature),
                index: day * 24,
                dayIndex: day,
            };
        });
    },
};
