const PATHS = {
    basePath: './assets/weatherIcon',
    defaultPath: './assets/weatherIcon/no-configuration-setting-icon.svg'
};

const ICON_MAP = {
    day: {
        sunny: PATHS.basePath + '/day/sunny/day-sunny-color-icon.svg',
        fog: PATHS.basePath + '/day/day-cloud-fog-color-icon.svg',
        lowCloudyIcons: {
            cloudy: {
                cloudy: PATHS.basePath + '/day/lowCloudyIcons/cloudy/day-cloudy-color-icon.svg',
                windy: PATHS.basePath + '/day/lowCloudyIcons/cloudy/day-cloud-wind-color-icon.svg',
            },
            rainbow: PATHS.basePath + '/day/lowCloudyIcons/rainbow/day-cloud-rainbow-color-icon.svg',
            precipitation: {
                rainy: {
                    rain: PATHS.basePath + '/day/lowCloudyIcons/precipitation/day-cloud-rain-color-icon.svg',
                    showel: PATHS.basePath + '/day/lowCloudyIcons/precipitation/day-cloud-rain-lightning-color-icon.svg',
                    thunderstorm: PATHS.basePath + '/day/lowCloudyIcons/precipitation/day-cloud-lightning-color-icon.svg'
                },
                snowy: PATHS.basePath + '/day/lowCloudyIcons/precipitation/day-cloud-snow-color-icon.svg'
            }

        },
        highCloudyIcons: {
            cloudy: {
                cloudy: PATHS.basePath + '/day/highCloudyIcons/cloudy/day-cloudy-color-icon.svg',
                windy: PATHS.basePath + '/day/highCloudyIcons/cloudy/cloud-wind-color-icon.svg',
            },
            precipitation: {
                rainy: {
                    rain: PATHS.basePath + '/day/highCloudyIcons/precipitation/cloud-rain-color-icon.svg',
                    showel: PATHS.basePath + '/day/highCloudyIcons/precipitation/cloud-rain-lightning-color-icon.svg',
                    thunderstorm: PATHS.basePath + '/day/highCloudyIcons/precipitation/cloud-lightning-color-icon.svg'
                },
                snowy: PATHS.basePath + '/day/highCloudyIcons/precipitation/day-cloud-snow-color-icon.svg'
            }
        }

    },
    night: {
        sunny: PATHS.basePath + '/night/sunny/night-icon-gold.svg',
        fog: PATHS.basePath + '/night/fog/night-cloud-fog-color-icon.svg',
        cloudy: {
            cloudy: PATHS.basePath + '/night/cloudy/night-cloudy-color-icon.svg',
            windy: PATHS.basePath + '/night/cloudy/night-cloud-wind-color-icon.svg',
        },
        precipitation: {
            rainy: {
                rain: PATHS.basePath + '/night/precipitation/rainy/night-cloud-rain-color-icon.svg',
                showel: PATHS.basePath + '/night/precipitation/rainy/night-cloud-rain-lightning-color-icon.svg',
                thunderstorm: PATHS.basePath + '/night/precipitation/rainy/night-cloud-lightning-color-icon.svg'
            },
            snowy: PATHS.basePath + '/night/precipitation/snowy/night-cloud-snow-color-icon.svg'
        }

    },
    sunset: {//daily data
        sunny: PATHS.basePath + '/morning-icon.svg',
    },
    default: PATHS.defaultPath
};

const isSunny = (code) => code == 0;
const isFoggy = (code) => code == 45 || code == 48;
const isCloudy = (code) => code >= 1 && code <= 3;
const isRainy = (code) => code >= 49 && code <= 67;
const isShowel = (code) => code >= 80 && code <= 82;
const isStormy = (code) => code >= 95 && code <= 99;
const isSnowy = (code) => (code >= 70 && code <= 77) || (code >= 85 && code <= 86);

const isSunriseOrSunSet = (time, sunrise, sunset) => {
    const timeMs = new Date(time).getTime();
    const sunriseMs = new Date(sunrise).getTime();
    const sunsetMs = new Date(sunset).getTime();

    // 10 минут в миллисек
    const tenMinutes = 10 * 60 * 1000;

    const isCloseToSunrise = Math.abs(timeMs - sunriseMs) <= tenMinutes;
    const isCloseToSunset = Math.abs(timeMs - sunsetMs) <= tenMinutes;

    return isCloseToSunrise || isCloseToSunset;
}

const isDayByHour = (data, hour) => {
    const time = data.getHourly(hour).time;
    const timeMs = new Date(time).getTime();

    for (let i = 0; i < data.input.pastDays + data.input.forecastDays; i++) {
        const sunrise = data.getDaily(i).sunrise;
        const sunset = data.getDaily(i).sunset;

        const sunriseMs = new Date(sunrise).getTime();
        const sunsetMs = new Date(sunset).getTime();

        if (((timeMs > sunriseMs) && (timeMs < sunsetMs))) {
            return true;
        }
    }
    return false;
}

const getDailyCloudCover = (data, day) => {
    const startHour = day * 24;
    let cloudCover = 0;

    for (let i = startHour; i < startHour + 24; i++) {
        cloudCover += data.getHourly(i).cloudCover;
    }
    cloudCover = cloudCover / 24;
    return cloudCover;
}

export const weatherMapper = {
    getCurrentIcon(data) {
        const dayTime = data.current.isDay; // 0-night 1-day
        const weatherCode = data.current.weatherCode;
        const cloudCover = data.current.cloudCover;
        const windSpeed = data.current.windSpeed;

        const currentDayIndex = data.input.pastDays;
        const time = data.current.time;
        const sunrise = data.getDaily(currentDayIndex).sunrise;
        const sunset = data.getDaily(currentDayIndex).sunset;

        if (isSunriseOrSunSet(time, sunrise, sunset) && isSunny(weatherCode)) {
            return ICON_MAP.sunset.sunny;
        }

        if (!dayTime) {//night
            if (isSunny(weatherCode)) {
                return ICON_MAP.night.sunny;
            }
            if (isFoggy(weatherCode)) {
                return ICON_MAP.night.fog;
            }
            if (isCloudy(weatherCode)) {
                if (windSpeed >= 8) {
                    return ICON_MAP.night.cloudy.windy;
                } else {
                    return ICON_MAP.night.cloudy.cloudy;
                }
            }

            if (isRainy(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.rain;
            }
            if (isShowel(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.showel;
            }
            if (isStormy(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.thunderstorm;
            }
            if (isSnowy(weatherCode)) {
                return ICON_MAP.night.precipitation.snowy;
            }

        } else { //day
            if (isSunny(weatherCode)) {
                return ICON_MAP.day.sunny;
            }
            if (isFoggy(weatherCode)) {
                return ICON_MAP.day.fog;
            }
            if (cloudCover <= 50) {
                if (isCloudy(weatherCode)) {
                    if (windSpeed >= 8) {
                        return ICON_MAP.day.lowCloudyIcons.cloudy.windy;
                    } else {
                        return ICON_MAP.day.lowCloudyIcons.cloudy.cloudy;
                    }
                }

                if (isRainy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.rain;
                }
                if (isShowel(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.showel;
                }
                if (isStormy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.thunderstorm;
                }
                if (isSnowy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.snowy;
                }

            } else {
                if (isCloudy(weatherCode)) {
                    if (windSpeed >= 8) {
                        return ICON_MAP.day.highCloudyIcons.cloudy.windy;
                    } else {
                        return ICON_MAP.day.highCloudyIcons.cloudy.cloudy;
                    }
                }

                if (isRainy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.rain;
                }
                if (isShowel(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.showel;
                }
                if (isStormy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.thunderstorm;
                }
                if (isSnowy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.snowy;
                }

            }
        }

        return ICON_MAP.default;
    },



    getIconByHour(data, hour) {
        const dayTime = isDayByHour(data, hour); // 0-night 1-day
        const weatherCode = data.getHourly(hour).weatherCode;
        const cloudCover = data.getHourly(hour).cloudCover;
        const windSpeed = data.getHourly(hour).windSpeed;

        const currentDayIndex = data.input.pastDays;
        const sunrise = data.getDaily(currentDayIndex).sunrise;
        const sunset = data.getDaily(currentDayIndex).sunset;
        const time = data.getHourly(hour).time;

        if (isSunriseOrSunSet(time, sunrise, sunset) && isSunny(weatherCode)) {
            return ICON_MAP.sunset.sunny;
        }

        if (!dayTime) {//night
            if (isSunny(weatherCode)) {
                return ICON_MAP.night.sunny;
            }
            if (isFoggy(weatherCode)) {
                return ICON_MAP.night.fog;
            }
            if (isCloudy(weatherCode)) {
                if (windSpeed >= 8) {
                    return ICON_MAP.night.cloudy.windy;
                } else {
                    return ICON_MAP.night.cloudy.cloudy;
                }
            }

            if (isRainy(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.rain;
            }
            if (isShowel(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.showel;
            }
            if (isStormy(weatherCode)) {
                return ICON_MAP.night.precipitation.rainy.thunderstorm;
            }
            if (isSnowy(weatherCode)) {
                return ICON_MAP.night.precipitation.snowy;
            }

        } else { //day
            if (isSunny(weatherCode)) {
                return ICON_MAP.day.sunny;
            }
            if (isFoggy(weatherCode)) {
                return ICON_MAP.day.fog;
            }
            if (cloudCover <= 50) {
                if (isCloudy(weatherCode)) {
                    if (windSpeed >= 8) {
                        return ICON_MAP.day.lowCloudyIcons.cloudy.windy;
                    } else {
                        return ICON_MAP.day.lowCloudyIcons.cloudy.cloudy;
                    }
                }

                if (isRainy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.rain;
                }
                if (isShowel(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.showel;
                }
                if (isStormy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.thunderstorm;
                }
                if (isSnowy(weatherCode)) {
                    return ICON_MAP.day.lowCloudyIcons.precipitation.snowy;
                }

            } else {
                if (isCloudy(weatherCode)) {
                    if (windSpeed >= 8) {
                        return ICON_MAP.day.highCloudyIcons.cloudy.windy;
                    } else {
                        return ICON_MAP.day.highCloudyIcons.cloudy.cloudy;
                    }
                }

                if (isRainy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.rain;
                }
                if (isShowel(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.showel;
                }
                if (isStormy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.rainy.thunderstorm;
                }
                if (isSnowy(weatherCode)) {
                    return ICON_MAP.day.highCloudyIcons.precipitation.snowy;
                }

            }
        }
        return ICON_MAP.default;
    },



    getIconByDay(data, day) {
        const weatherCode = data.getDaily(day).weatherCode;
        const cloudCover = getDailyCloudCover(data, day);

        if (isSunny(weatherCode)) {
            return ICON_MAP.day.sunny;
        }
        if (isFoggy(weatherCode)) {
            return ICON_MAP.day.fog;
        }
        if (cloudCover <= 50) {
            if (isCloudy(weatherCode)) {
                return ICON_MAP.day.lowCloudyIcons.cloudy.cloudy;
            }

            if (isRainy(weatherCode)) {
                return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.rain;
            }
            if (isShowel(weatherCode)) {
                return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.showel;
            }
            if (isStormy(weatherCode)) {
                return ICON_MAP.day.lowCloudyIcons.precipitation.rainy.thunderstorm;
            }
            if (isSnowy(weatherCode)) {
                return ICON_MAP.day.lowCloudyIcons.precipitation.snowy;
            }

        } else {
            if (isCloudy(weatherCode)) {
                return ICON_MAP.day.highCloudyIcons.cloudy.cloudy;
            }

            if (isRainy(weatherCode)) {
                return ICON_MAP.day.highCloudyIcons.precipitation.rainy.rain;
            }
            if (isShowel(weatherCode)) {
                return ICON_MAP.day.highCloudyIcons.precipitation.rainy.showel;
            }
            if (isStormy(weatherCode)) {
                return ICON_MAP.day.highCloudyIcons.precipitation.rainy.thunderstorm;
            }
            if (isSnowy(weatherCode)) {
                return ICON_MAP.day.highCloudyIcons.precipitation.snowy;
            }

        }

        return ICON_MAP.default;
    },

    getDailyCoudCoverTest(data, day) {
        return getDailyCloudCover(data, day);
    }
}

