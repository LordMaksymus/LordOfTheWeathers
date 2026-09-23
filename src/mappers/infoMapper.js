import { weatherMapper } from "./weatherMapper";
import { WeatherUnitUtil } from "../utils/weatherUnitUtil";

const getLevelOfUV = (uvIndex) => {
  if (uvIndex <= 2) {
    return "Low";
  }
  if (uvIndex > 2 && uvIndex <= 5) {
    return "Moderate";
  }
  if (uvIndex > 5 && uvIndex <= 7) {
    return "High";
  }
  if (uvIndex > 7 && uvIndex <= 10) {
    return "Very high";
  }
  return "Extreme";
};

const getDailyCloudCover = (data, day) => {
  const startHour = day * 24;
  let cloudCover = 0;

  for (let i = startHour; i < startHour + 24; i++) {
    cloudCover += data.getHourly(i).cloudCover;
  }
  cloudCover = cloudCover / 24;

  return Number(cloudCover.toFixed(2));
}

export const infoMapper = {
  getWeatherData(selection, data, unitOfTemperature, unitOfPrecipitation, unitOfWindSpeed) {
    const currentHour = Number(data.current.time.split("T")[1].slice(0, 2));

    if (selection.mode === "current") {
      const hourIndex = data.input.pastDays * 24 + currentHour;

      return {
        icon: weatherMapper.getCurrentIcon(data),
        temperature: WeatherUnitUtil.formatTemperature(data.current.temp, unitOfTemperature),
        humidity: data.current.humidity,
        precipitation: WeatherUnitUtil.formatPrecipitation(data.current.precipitation, unitOfPrecipitation),
        wind: WeatherUnitUtil.formatWindSpeed(data.current.windSpeed, unitOfWindSpeed),
        apparentTemp: WeatherUnitUtil.formatTemperature(data.current.apparentTemp, unitOfTemperature),
        cloudCover: data.current.cloudCover,
        uvIndex: getLevelOfUV(data.getHourly(hourIndex).uvIndex),
        unitOfTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
        unitOfHumidity: "%",
        unitOfPrecipitation: WeatherUnitUtil.unitToAdd(unitOfPrecipitation),
        unitOfWind: WeatherUnitUtil.unitToAdd(unitOfWindSpeed),
        unitOfApparentTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
        unitOfCloudCover: "%",
      };
    } else {
      if (!selection) { // Возможно уберет функцию возврата на current
        const hourIndex = data.input.pastDays * 24 + currentHour;

        return {
          icon: weatherMapper.getCurrentIcon(data),
          temperature: WeatherUnitUtil.formatTemperature(data.current.temp, unitOfTemperature),
          humidity: data.current.humidity,
          precipitation: WeatherUnitUtil.formatPrecipitation(data.current.precipitation, unitOfPrecipitation),
          wind: WeatherUnitUtil.formatWindSpeed(data.current.windSpeed, unitOfWindSpeed),
          apparentTemp: WeatherUnitUtil.formatTemperature(data.current.apparentTemp, unitOfTemperature),
          cloudCover: data.current.cloudCover,
          uvIndex: getLevelOfUV(data.getHourly(hourIndex).uvIndex),
          unitOfTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
          unitOfHumidity: "%",
          unitOfPrecipitation: WeatherUnitUtil.unitToAdd(unitOfPrecipitation),
          unitOfWind: WeatherUnitUtil.unitToAdd(unitOfWindSpeed),
          unitOfApparentTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
          unitOfCloudCover: "%",
        };
      }






      if (selection.mode === "custom day") {
        const dayIndex = selection.dayIndex;
        if (dayIndex < 0 || dayIndex >= ((data.input.pastDays + data.input.forecastDays))) {
          return {
            icon: "No data",
            temperature: "No data",
            humidity: "No data",
            precipitation: "No data",
            wind: "No data",
            apparentTemp: "No data",
            cloudCover: "No data",
            uvIndex: "No data"
          };
        }
        console.log("custom day")
        return {
          icon: weatherMapper.getIconByDay(data, dayIndex),
          temperature: WeatherUnitUtil.formatTemperature(data.getDaily(dayIndex).maxTemp, unitOfTemperature),
          humidity: data.getHourly(dayIndex * 24).humidity,
          precipitation: WeatherUnitUtil.formatPrecipitation(data.getDaily(dayIndex).precipSum, unitOfPrecipitation),
          wind: WeatherUnitUtil.formatWindSpeed(data.getDaily(dayIndex).maxWindSpeed, unitOfWindSpeed),
          apparentTemp: WeatherUnitUtil.formatTemperature(data.getDaily(dayIndex).maxApparentTemp, unitOfTemperature),
          cloudCover: getDailyCloudCover(data, dayIndex),
          uvIndex: getLevelOfUV(data.getDaily(dayIndex).maxUvIndex),
          unitOfTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
          unitOfHumidity: "%",
          unitOfPrecipitation: WeatherUnitUtil.unitToAdd(unitOfPrecipitation),
          unitOfWind: WeatherUnitUtil.unitToAdd(unitOfWindSpeed),
          unitOfApparentTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
          unitOfCloudCover: "%",
        };

      }




      const hourIndex = selection.index;

      if (hourIndex < 0 || hourIndex >= ((data.input.pastDays + data.input.forecastDays) * 24)) {
        return {
          icon: "No data",
          temperature: "No data",
          humidity: "No data",
          precipitation: "No data",
          wind: "No data",
          apparentTemp: "No data",
          cloudCover: "No data",
          uvIndex: "No data"
        };
      }

      return {
        icon: weatherMapper.getIconByHour(data, hourIndex),
        temperature: WeatherUnitUtil.formatTemperature(data.getHourly(hourIndex).temp, unitOfTemperature),
        humidity: data.getHourly(hourIndex).humidity,
        precipitation: WeatherUnitUtil.formatPrecipitation(data.getHourly(hourIndex).precipitation, unitOfPrecipitation),
        wind: WeatherUnitUtil.formatWindSpeed(data.getHourly(hourIndex).windSpeed, unitOfWindSpeed),
        apparentTemp: WeatherUnitUtil.formatTemperature(data.getHourly(hourIndex).apparentTemp, unitOfTemperature),
        cloudCover: data.getHourly(hourIndex).cloudCover,
        uvIndex: getLevelOfUV(data.getHourly(hourIndex).uvIndex),
        unitOfTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
        unitOfHumidity: "%",
        unitOfPrecipitation: WeatherUnitUtil.unitToAdd(unitOfPrecipitation),
        unitOfWind: WeatherUnitUtil.unitToAdd(unitOfWindSpeed),
        unitOfApparentTemperature: WeatherUnitUtil.unitToAdd(unitOfTemperature),
        unitOfCloudCover: "%",
      };
    }
  }
};