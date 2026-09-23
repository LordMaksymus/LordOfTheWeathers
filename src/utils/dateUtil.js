export const dateUtil = {
    getCurrentMounth: (date) => {
        const numberOfMonth = Number(date.split("-")[1]);
        if (numberOfMonth == 1) {
            return "Jan";
        }
        if (numberOfMonth == 2) {
            return "Feb";
        }
        if (numberOfMonth == 3) {
            return "Mar";
        }
        if (numberOfMonth == 4) {
            return "Apr";
        }
        if (numberOfMonth == 5) {
            return "May";
        }
        if (numberOfMonth == 6) {
            return "Jun";
        }
        if (numberOfMonth == 7) {
            return "Jul";
        }
        if (numberOfMonth == 8) {
            return "Aug";
        }
        if (numberOfMonth == 9) {
            return "Sep";
        }
        if (numberOfMonth == 10) {
            return "Okt";
        }
        if (numberOfMonth == 11) {
            return "Nov";
        }
        if (numberOfMonth == 12) {
            return "Dec";
        }
        return "Jan";
    },

    getDayOfMonth: (date) => {
        const dayOfMonth = Number(date.split("-")[2]);
        return dayOfMonth;
    }
}