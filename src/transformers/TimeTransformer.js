export const TimeTransformer = {
    getTime(data){
        return data?.time ?? null;
    },
    getDate(data){
        return data?.date ?? null;
    },
    getDayOfWeek(data){
        return data?.day_of_week ?? null;
    },
    getTimezone(data){
        return data?.timezone ?? null;
    }
}