import { useEffect, useState } from "react";
import { getTimeByCoordinates } from "../services/TimeService";
import { TimeTransformer } from "../transformers/TimeTransformer";

export const useTime = (lat, lon) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (lat === null || lon === null) return;
        const fetchAndTransform = async () => {
            try {
                setLoading(true);
                const rawData = await getTimeByCoordinates(lat, lon);

                const processedData = {
                    time: TimeTransformer.getTime(rawData),
                    date: TimeTransformer.getDate(rawData),
                    timezone: TimeTransformer.getTimezone(rawData),
                    dayOfWeek: TimeTransformer.getDayOfWeek(rawData)
                };

                setData(processedData);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAndTransform();
    }, [lat, lon]);

    return { data, loading };
}