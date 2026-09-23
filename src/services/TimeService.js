export const getTimeByCoordinates = async(lat, lon) => {
    const response = await fetch(`https://timeapi.io/api/v1/time/current/coordinate?`+
        `latitude=${lat}&longitude=${lon}`);

    if(!response.ok) throw new Error("API Error in TimeService");

    return await response.json();
}


