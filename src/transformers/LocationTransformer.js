export const LocationTransformer = {
    getTownByCoordinates(data) {
        return data?.address?.city ?? null;
    },
    getRegionByCoordinates(data) {
        return data?.address?.state ?? null;
    },
    getCountryByCoordinates(data) {
        return data?.address?.country ?? null;
    },


    getLatByCity(data) {
        return (Array.isArray(data) && data.length > 0) ? data[0].lat : null;
    },
    getLonByCity(data) {
        return (Array.isArray(data) && data.length > 0) ? data[0].lon : null;
    },
    getTownByCity(data) {
        return (Array.isArray(data) && data.length > 0) ? data[0].name : null;
    },
    getRegionByCity(data) {
        const str = (Array.isArray(data) && data.length > 0) ? data?.[0].display_name : null;
        if (str === null) {
            return null
        }
        const arr = str.split(", ");
        if (arr.length < 4) {
            return null
        }
        return arr[arr.length - 3];
    },
    getCountryByCity(data) {
        const str = (Array.isArray(data) && data.length > 0) ? data?.[0].display_name : null;
        if (str === null) {
            return null
        }
        const arr = str.split(", ");
        if (arr.length < 4) {
            return null
        }
        return arr[arr.length - 1];
    },

    getAllLatsByCity(data) {
        if (!Array.isArray(data)) return [];
        return data.map(item => item.lat || null);
    },

    getAllLonsByCity(data) {
        if (!Array.isArray(data)) return [];
        return data.map(item => item.lon || null);
    },

    getAllTownsByCity(data) {
        if (!Array.isArray(data)) return [];
        return data.map(item => item.name || null);
    },
    getAllRegionsByCity(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        return data.map(item => {
            if (!item.display_name) return null;

            const parts = item.display_name.split(", ");

            return parts.length >= 4 ? parts[parts.length - 3] : null;
        });
    },
    getAllCountriesByCity(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        return data.map(item => {
            if (!item.display_name) return null;

            const parts = item.display_name.split(", ");

            return parts.length > 0 ? parts[parts.length - 1] : null;
        });
    },
};