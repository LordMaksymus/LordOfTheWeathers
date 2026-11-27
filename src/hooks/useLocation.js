import { useMemo } from 'react';
import { getLocationByCoordinates } from '../services/LocationService';
import { useRequest } from './useRequest';

export function useLocationByCoordinates(lat, lon) {
    const request = useMemo(() => Number.isFinite(lat) && Number.isFinite(lon)
        ? signal => getLocationByCoordinates(lat, lon, signal)
        : null, [lat, lon]);

    return useRequest(request);
}
