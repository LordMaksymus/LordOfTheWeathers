import { LocationTransformer } from '../transformers/LocationTransformer';
import { validateCoordinates } from '../utils/coordinates';
import { fetchJson, RequestError } from './fetchJson';

export async function getLocationByCity(cityName, signal) {
    const params = new URLSearchParams({ q: cityName, format: 'jsonv2', addressdetails: '1', limit: '5' });
    const data = await fetchJson('https://nominatim.openstreetmap.org/search?' + params, signal);

    if (!Array.isArray(data)) throw new RequestError('invalid-response');
    if (data.length === 0) return null;

    for (const place of data) {
        const { coordinates } = validateCoordinates(place?.lat, place?.lon);
        if (coordinates) {
            const address = LocationTransformer.getAddress(place, place.name || cityName);
            return { ...coordinates, address };
        }
    }

    throw new RequestError('invalid-response');
}

export async function getLocationByCoordinates(lat, lon, signal) {
    const params = new URLSearchParams({ lat, lon, zoom: '10', format: 'jsonv2' });
    const data = await fetchJson('https://nominatim.openstreetmap.org/reverse?' + params, signal);
    if (!data?.address || typeof data.address !== 'object') return null;

    return LocationTransformer.getAddress(data);
}
