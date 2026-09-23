import { WeatherUnitUtil } from "../utils/weatherUnitUtil";

const getNextHour = (currentHour, forecastHours) => {
    var hour = currentHour + forecastHours;
    if ((hour) > 23) {
        hour = hour - 24;
    }

    if (hour < 10) {
        return "0" + hour;
    }
    return hour;
}

export const chartMapper = {
    getTempChartData(selection, data, unitOfTemp, unitOfTime) {
        if (selection.mode === "current" || selection.chartIndex === null) {
            const currentHour = Number(data.current.time.split("T")[1].slice(0, 2));
            const startIndex = data.input.pastDays * 24 + currentHour;


            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    temp: WeatherUnitUtil.formatTemperature(data.getHourly(startIndex + hourOffset).temp, unitOfTemp),

                    index: startIndex + hourOffset
                };
            });
        } else {
            const currentHour = 0;
            const startIndex = selection.chartIndex;
            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    temp: WeatherUnitUtil.formatTemperature(data.getHourly(startIndex + hourOffset).temp, unitOfTemp),

                    index: startIndex + hourOffset
                };
            });
        }
    },

    tempFormatter(value, unit) {
        if (unit === 'K') {
            return `${value}K`;
        }
        if (unit === 'F') {
            return `${value}°F`;
        }
        return `${value}°C`;
    },

    getPrecipProbabilityChartData(selection, data, unitOfTime) {
        if (selection.mode === "current" || selection.chartIndex === null) {
            const currentHour = Number(data.current.time.split("T")[1].slice(0, 2));
            const startIndex = data.input.pastDays * 24 + currentHour;


            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    precipitationProbability: (data.getHourly(startIndex + hourOffset).precipitationProbability),

                    index: startIndex + hourOffset
                };
            });
        } else {
            if (!selection) { // Возможно уберет функцию возврата на current
                const currentHour = Number(data.current.time.split("T")[1].slice(0, 2));
                const startIndex = data.input.pastDays * 24 + currentHour;
                return Array.from({ length: 24 }).map((_, i) => {
                    const hourOffset = i;
                    const hour = getNextHour(currentHour, hourOffset);

                    return {
                        time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                        precipitationProbability: (data.getHourly(startIndex + hourOffset).precipitationProbability),

                        index: startIndex + hourOffset
                    };
                });
            }

            const currentHour = 0;
            const startIndex = selection.chartIndex;
            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    precipitationProbability: (data.getHourly(startIndex + hourOffset).precipitationProbability),

                    index: startIndex + hourOffset
                };
            });
        }
    },

    precipProbabilityFormatter(value) {
        return `${value}%`;
    },
}