import { WeatherUnitUtil } from '../utils/weatherUnitUtil';
import { dateUtil } from '../utils/dateUtil';

function localDateTime(forecast) {
    if (forecast.timezone) {
        try {
            const formatter = new Intl.DateTimeFormat('en', {
                timeZone: forecast.timezone,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
            });
            const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(({ type, value }) => [type, value]));
            return { date: parts.year + '-' + parts.month + '-' + parts.day, time: parts.hour + ':' + parts.minute };
        } catch (error) {
            if (!(error instanceof RangeError)) throw error;
        }
    }

    const [date, time] = forecast.current.time.split('T');
    return { date, time };
}

export const headerMapper = {
    getHeaderData(location, fallbackLocation, forecast, unitOfTime) {
        const place = [location?.town, location?.region, location?.country]
            .filter(value => typeof value === 'string' && value.trim())
            .map(value => value.trim());
        const { date, time } = localDateTime(forecast);

        return {
            settingsIcon: './assets/headerIcon/sliders-icon.svg',
            location: [...new Set(place)].join(', ') || fallbackLocation,
            dayOfWeek: dateUtil.getWeekday(date),
            dayOfMonth: dateUtil.getDayOfMonth(date),
            month: dateUtil.getCurrentMounth(date),
            time: WeatherUnitUtil.formatTime(time, unitOfTime),
        };
    },
};
