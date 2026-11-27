export const WeatherUnitUtil = {
    formatTemperature: (temp, unit = 'C') => {
        if (temp == null) return null;
        if (unit === "F") {
            return (temp * 1.8 + 32).toFixed(1);
        }
        if (unit === "K") {
            return (temp + 273.15).toFixed(1);
        }
        return temp;
    },

    formatTime: (time, unit = "24h") => {
        const [hours, minutes] = time.split(':');
        const hour = Number(hours);
        if (unit === '12h') {
            const period = hour < 12 ? 'AM' : 'PM';
            return (hour % 12 || 12) + ':' + minutes + ' ' + period;
        }
        return hours.padStart(2, '0') + ':' + minutes;
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
        if (unit === "in" || unit === "inch") {
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
        if (unit === "in" || unit === "inch") {
            return "in";
        }
        return "%";
    }
};

