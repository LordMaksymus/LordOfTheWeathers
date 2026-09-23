import { WeatherUnitUtil } from "../utils/weatherUnitUtil";
import { weatherMapper } from "./weatherMapper";
import { dateUtil } from "../utils/dateUtil";

const getShortenedDayOfWeek = (dayOfWeek) => {
    return dayOfWeek.slice(0, 3);
}

const getDayOfWeekIndex = (shortenedDayOfWeek) => {
    if (shortenedDayOfWeek === "Mon") {
        return 1;
    }
    if (shortenedDayOfWeek === "Tue") {
        return 2;
    }
    if (shortenedDayOfWeek === "Wed") {
        return 3;
    }
    if (shortenedDayOfWeek === "Thu") {
        return 4;
    }
    if (shortenedDayOfWeek === "Fri") {
        return 5;
    }
    if (shortenedDayOfWeek === "Sat") {
        return 6;
    }
    return 7;

}

const getDayOfWeekByIndex = (index) => {
    switch (index) {
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        case 7:
            return "Sun";
    }
    return null;
}

const getNextDayOfWeek = (shortenedDayOfWeek, pastDays) => {
    if (pastDays % 7 == 0) {
        return shortenedDayOfWeek;
    }

    const index = getDayOfWeekIndex(shortenedDayOfWeek);
    let indexOfNextDay = index + pastDays;

    while (indexOfNextDay <= 0 || indexOfNextDay > 7) {
        if (indexOfNextDay <= 0) {
            indexOfNextDay += 7;
        }
        if (indexOfNextDay > 7) {
            indexOfNextDay -= 7;
        }
    }

    return getDayOfWeekByIndex(indexOfNextDay);

}

export const weekWeatherMapper = {// при нажатии делится данными
    getWeekData(data, timeData, unitOfTemperature) {
        const lenghOfArray = data.input.pastDays + data.input.forecastDays;

        return Array.from({ length: lenghOfArray }).map((_, i) => {
            const day = i;

            return {
                arrowLeftIcon: "./assets/arrows/left-arrow.svg",
                arrowRightIcon: "./assets/arrows/right-arrow.svg",

                icon: weatherMapper.getIconByDay(data, day),
                dayOfWeek: getNextDayOfWeek(getShortenedDayOfWeek(timeData.dayOfWeek), day - data.input.pastDays),
                month: dateUtil.getDayOfMonth(data.getDaily(day).time) + " " + dateUtil.getCurrentMounth(data.getDaily(day).time),
                maxTemp: data.getDaily(day).maxTemp,
                minTemp: data.getDaily(day).minTemp,

                index: day * 24,
                dayIndex: day
            }
        })
    }
}
