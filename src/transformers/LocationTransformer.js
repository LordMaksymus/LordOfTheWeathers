export const LocationTransformer = {
    getTownByCoordinates(data) {
        const { city, town, village, municipality } = data.address;
        return city ?? town ?? village ?? municipality ?? null;
    },
    getRegionByCoordinates(data) {
        const { state, region, county } = data.address;
        return state ?? region ?? county ?? null;
    },
    getCountryByCoordinates(data) {
        return data.address.country ?? null;
    },
};
