export const LocationTransformer = {
    getAddress(data, fallbackTown = null) {
        const { city, town, village, hamlet, municipality, state, region, county, country } = data.address ?? {};
        return {
            town: city || town || village || hamlet || municipality || fallbackTown,
            region: state || region || county || null,
            country: country || null,
        };
    },
};
