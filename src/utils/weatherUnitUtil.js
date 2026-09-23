export const WeatherUnitUtil = {
    formatTemperature: (temp, unit = 'C') => {
        if (unit === "F") {
            return (temp * 1.8 + 32).toFixed(1);
        }
        if (unit === "K") {
            return (temp + 273.15).toFixed(1);
        }
        return temp;
    },

    formatTime: (time, unit = "24h") => {
        const newTime = time.slice(0, 5);
        if (unit === "12h") {
            let hour = Number(newTime.split(":")[0]);
            let min = Number(newTime.split(":")[1]);
            if (hour == 0) {
                return 12 + ":" + min + " AM";
            }
            if (hour > 0 && hour < 12) {
                return hour + ":" + min + " PM";
            }
            if (hour == 12) {
                return 12 + ":" + min + " PM";
            }
            if (hour > 12) {
                hour -= 12;
                return hour + ":" + min + " PM";
            }
        }
        return newTime;
    },

    formatWindSpeed: (windSpeed, unit = "ms") => {
        if ("kmh" === unit) {
            return (windSpeed * 3.6).toFixed(1);
        }
        if ("mph" === unit) {
            return (windSpeed * 2.236936).toFixed(1);
        }
        if ("knots" === unit) {
            return (windSpeed * 1.943844).toFixed(1);
        }
        return windSpeed;
    },

    formatPrecipitation: (precipitation, unit = "mm") => {
        if ("inch" === unit) {
            return (precipitation * 0.03937008).toFixed(1);
        }
        return precipitation;
    },

    unitToAdd: (unit) => {
        if (unit === "C") {
            return "°C";
        }
        if (unit === "F") {
            return "°F";
        }
        if (unit === "K") {
            return "K";
        }
        if ("kmh" === unit) {
            return "km/h";
        }
        if ("mph" === unit) {
            return "mph";
        }
        if ("knots" === unit) {
            return "knots";
        }
        if ("ms" === unit) {
            return "m/s";
        }
        if ("mm" === unit) {
            return "mm";
        }
        if ("inch" === unit) {
            return "inch";
        }
        return "%";
    }
};

