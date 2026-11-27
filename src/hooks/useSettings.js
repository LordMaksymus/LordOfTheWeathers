import { useEffect, useState } from 'react';
import { supportsGeolocation } from '../services/GeolocationService';
import { validateCoordinates } from '../utils/coordinates';

const storage = (globalThis.browser ?? globalThis.chrome)?.storage?.local;

export const DEFAULT_SETTINGS = {
    locationMethod: supportsGeolocation ? 'geo' : 'city',
    city: '',
    latitude: '',
    longitude: '',
    units: {
        time: '24h',
        wind: 'ms',
        temperature: 'C',
        precipitation: 'mm',
    },
};

function legacyCoordinate(value) {
    if (typeof value === 'string' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)[eE][+-]?\d+$/.test(value.trim())) {
        return Number(value);
    }
    return value ?? '';
}

function normalizeSettings(saved) {
    const savedMethod = !supportsGeolocation && saved?.locationMethod === 'geo'
        ? 'coordinates'
        : saved?.locationMethod;
    const settings = {
        locationMethod: ['geo', 'city', 'coordinates'].includes(savedMethod)
            ? savedMethod
            : DEFAULT_SETTINGS.locationMethod,
        city: typeof saved?.city === 'string' ? saved.city.trim() : '',
        address: saved?.address ?? null,
        latitude: legacyCoordinate(saved?.latitude),
        longitude: legacyCoordinate(saved?.longitude),
        units: {
            time: saved?.units?.time === '12h' ? '12h' : '24h',
            temperature: saved?.units?.temperature === 'F' ? 'F' : 'C',
            wind: ['kmh', 'mph'].includes(saved?.units?.wind) ? saved.units.wind : 'ms',
            precipitation: ['in', 'inch'].includes(saved?.units?.precipitation) ? 'in' : 'mm',
        },
    };

    const { coordinates } = validateCoordinates(settings.latitude, settings.longitude);
    const isConfigured = Boolean(coordinates && (settings.locationMethod !== 'city' || settings.city));
    return { settings: isConfigured ? { ...settings, ...coordinates } : settings, isConfigured };
}

export function useSettings() {
    const [state, setState] = useState({ status: 'loading', settings: DEFAULT_SETTINGS, isConfigured: false });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;
        async function load() {
            try {
                const { settings } = await storage.get('settings');
                if (active) setState({ status: 'ready', ...normalizeSettings(settings) });
            } catch {
                if (active) setState({ status: 'error', settings: DEFAULT_SETTINGS, isConfigured: false });
            }
        }
        load();
        return () => { active = false; };
    }, [attempt]);

    function retry() {
        setState({ status: 'loading', settings: DEFAULT_SETTINGS, isConfigured: false });
        setAttempt(previous => previous + 1);
    }

    async function saveSettings(settings) {
        await storage.set({ settings });
        setState({ status: 'ready', settings, isConfigured: true });
    }

    return { ...state, retry, saveSettings };
}
