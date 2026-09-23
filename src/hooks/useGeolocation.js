import { useState } from "react";

export const useGeolocation = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const requestLocation = () => {
        setIsLoaded(false);
        setError(null);
        console.log("Request accepted");

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setIsLoaded(true);
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    setIsLoaded(true);
                    setError(err.message);
                    reject(err);
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
            );
        });
    };

    return { requestLocation, isLoaded, error };
};