import { WeatherUnitUtil } from "../utils/weatherUnitUtil";
import { dateUtil } from "../utils/dateUtil";

export const headerMapper = {
    getHeaderData(dataLocationByCoordinates, dataTime, unitOfTime = "24h") {
        let town = "";
        let region = "";
        let country = "";

        town = dataLocationByCoordinates.town + ",";

        region = dataLocationByCoordinates.region + ",";;

        country = dataLocationByCoordinates.country;

        if (region === town) {
            town = "";
        }

        return {
            settingsIcon: "./assets/headerIcon/sliders-icon.svg",

            town: town,
            region: region,
            country: country,

            dayOfWeek: dataTime.dayOfWeek,
            dayOfMonth: dateUtil.getDayOfMonth(dataTime.date),
            month: dateUtil.getCurrentMounth(dataTime.date),
            time: WeatherUnitUtil.formatTime(dataTime.time, unitOfTime)
        }
    }
}