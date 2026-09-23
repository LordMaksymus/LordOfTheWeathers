import { useState, useEffect } from 'react';
import { getLocationByCity, getLocationByCoordinates } from '../services/LocationService';
import { LocationTransformer } from '../transformers/LocationTransformer';

export const useLocationByCity = (cityName) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!cityName || cityName === '') {
            setData(null);
            setLoading(false);
            return;
        }
        const fetchAndTransform = async () => {
            try {
                setLoading(true);
                const rawData = await getLocationByCity(cityName);

                const processedData = {
                    lat: LocationTransformer.getLatByCity(rawData),
                    lon: LocationTransformer.getLonByCity(rawData),
                    town: LocationTransformer.getTownByCity(rawData),
                    region: LocationTransformer.getRegionByCity(rawData),
                    country: LocationTransformer.getCountryByCity(rawData),

                    allLats: LocationTransformer.getAllLatsByCity(rawData),
                    allLons: LocationTransformer.getAllLonsByCity(rawData),
                    allTowns: LocationTransformer.getAllTownsByCity(rawData),
                    allRegions: LocationTransformer.getAllRegionsByCity(rawData),
                    allCountries: LocationTransformer.getAllCountriesByCity(rawData)
                }
                setData(processedData);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAndTransform();
    }, [cityName]);

    if (!cityName || cityName === '') {
        return null;
    }

    return { data, loading };
}

export const useLocationByCoordinates = (lat, lon) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (lat === null || lon === null) return;
        const fetchAndTransform = async () => {
            try {
                setLoading(true);
                const rawData = await getLocationByCoordinates(lat, lon);

                const processedData = {
                    town: LocationTransformer.getTownByCoordinates(rawData),
                    region: LocationTransformer.getRegionByCoordinates(rawData),
                    country: LocationTransformer.getCountryByCoordinates(rawData)
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