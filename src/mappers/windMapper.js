import { WeatherUnitUtil } from "../utils/weatherUnitUtil";

export const ICON_MAP = {
    direction: {
        south: "./assets/chartIcon/windDirection/South.svg",
        southEast: "./assets/chartIcon/windDirection/South-East.svg",
        southWest: "./assets/chartIcon/windDirection/South-West.svg",
        west: "./assets/chartIcon/windDirection/West.svg",
        east: "./assets/chartIcon/windDirection/East.svg",
        north: "./assets/chartIcon/windDirection/North.svg",
        northWest: "./assets/chartIcon/windDirection/North-West.svg",
        northEast: "./assets/chartIcon/windDirection/North-East.svg"
    },
    force: {
        small: "./assets/chartIcon/windIcon/Small-Wind.svg",
        medium: "./assets/chartIcon/windIcon/Medium-Wind.svg",
        strong: "./assets/chartIcon/windIcon/Strong-Wind.svg",
        veryStrong: "./assets/chartIcon/windIcon/Very-Strong-Wind.svg"
    },
    default: "./assets/chartIcon/no-configuration-setting-icon.svg"
};

const getWindDirectionIcon = (data, hour) => {
    const windDirection = data.getHourly(hour).windDirection;
    if ((windDirection >= 0 && windDirection < 23) || (windDirection >= 338 && windDirection <= 360)) {
        return ICON_MAP.direction.north;
    }
    if ((windDirection >= 23 && windDirection < 68)) {
        return ICON_MAP.direction.northEast;
    }
    if ((windDirection >= 68 && windDirection < 113)) {
        return ICON_MAP.direction.east;
    }
    if ((windDirection >= 113 && windDirection < 158)) {
        return ICON_MAP.direction.southEast;
    }
    if ((windDirection >= 158 && windDirection < 203)) {
        return ICON_MAP.direction.south;
    }
    if ((windDirection >= 203 && windDirection < 248)) {
        return ICON_MAP.direction.southWest;
    }
    if ((windDirection >= 248 && windDirection < 293)) {
        return ICON_MAP.direction.west;
    }
    if ((windDirection >= 293 && windDirection < 338)) {
        return ICON_MAP.direction.northWest;
    }
    return ICON_MAP.default;
}

const getWindForceIcon = (data, hour) => {
    const windSpeed = data.getHourly(hour).windSpeed;
    if (windSpeed >= 0 && windSpeed < 5) {
        return ICON_MAP.force.small;
    }
    if (windSpeed >= 5 && windSpeed < 10) {
        return ICON_MAP.force.medium;
    }
    if (windSpeed >= 10 && windSpeed < 15) {
        return ICON_MAP.force.strong;
    }
    if (windSpeed >= 15) {
        return ICON_MAP.force.veryStrong;
    }
    return ICON_MAP.default;
}

const windFormatter = (value, unit) => {
    if ("kmh" === unit) {
        return `${value}km/h`;
    }
    if ("mph" === unit) {
        return `${value}mp/h`;
    }
    if ("knots" === unit) {
        return `${value}knots`;
    }
    return `${value}m/s`;
}

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

export const windMapper = {
    getWindChartData(selection, data, unitOfWindSpeed, unitOfTime) {
        if (selection.mode === "current" || selection.chartIndex === null) {
            const currentHour = Number(data.current.time.split("T")[1].slice(0, 2));
            const startIndex = data.input.pastDays * 24 + currentHour;

            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    windSpeed: windFormatter(WeatherUnitUtil.formatWindSpeed(data.getHourly(startIndex + hourOffset).windSpeed, unitOfWindSpeed), unitOfWindSpeed),
                    windDirectionIcon: getWindDirectionIcon(data, startIndex + hourOffset),
                    windForceIcon: getWindForceIcon(data, startIndex + hourOffset),

                    index: startIndex + hourOffset

                };
            })
        } else {
            const currentHour = 0;
            const startIndex = selection.chartIndex;

            return Array.from({ length: 24 }).map((_, i) => {
                const hourOffset = i;
                const hour = getNextHour(currentHour, hourOffset);

                return {
                    time: WeatherUnitUtil.formatTime(`${hour}:00`, unitOfTime),
                    windSpeed: windFormatter(WeatherUnitUtil.formatWindSpeed(data.getHourly(startIndex + hourOffset).windSpeed, unitOfWindSpeed), unitOfWindSpeed),
                    windDirectionIcon: getWindDirectionIcon(data, startIndex + hourOffset),
                    windForceIcon: getWindForceIcon(data, startIndex + hourOffset),

                    index: startIndex + hourOffset

                };
            })
        }
    }
}