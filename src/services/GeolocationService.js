import { validateCoordinates } from '../utils/coordinates';

const MAX_ACCURACY_METERS = 5000;
const MAX_POSITION_AGE_MS = 60000;
const BROWSER_TIMEOUT_MS = 15000;
const REQUEST_TIMEOUT_MS = 20000;

const messages = {
    1: 'Location access was denied. Allow location access in your browser or choose City or Coordinates.',
    2: 'Your browser could not determine your location. Try again or choose City or Coordinates.',
    3: 'Finding your location took too long. Try again or choose City or Coordinates.',
};

export function requestLocation(signal) {
    if (!navigator.geolocation) {
        return Promise.reject(new Error('Geolocation is unavailable. Choose City or Coordinates.'));
    }

    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }

        // The browser's timeout can exclude time spent waiting for permission.
        const timer = setTimeout(() => finish(reject, new Error(messages[3])), REQUEST_TIMEOUT_MS);
        const cancel = () => finish(reject, signal.reason);

        function finish(callback, value) {
            clearTimeout(timer);
            signal?.removeEventListener('abort', cancel);
            callback(value);
        }

        signal?.addEventListener('abort', cancel, { once: true });
        try {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude, accuracy } = position.coords;
                const { coordinates } = validateCoordinates(latitude, longitude);

                if (!coordinates || !Number.isFinite(accuracy) || accuracy <= 0) {
                    finish(reject, new Error(messages[2]));
                } else if (Date.now() - position.timestamp > MAX_POSITION_AGE_MS) {
                    finish(reject, new Error('The browser returned an old position. Try again or choose City or Coordinates.'));
                } else if (accuracy > MAX_ACCURACY_METERS) {
                    const kilometers = new Intl.NumberFormat('en', { maximumFractionDigits: 1 }).format(accuracy / 1000);
                    finish(reject, new Error('Location accuracy is about ' + kilometers + ' km. Try again or choose City or Coordinates.'));
                } else {
                    finish(resolve, { ...coordinates, accuracy });
                }
            }, error => {
                finish(reject, new Error(messages[error.code] ?? messages[2]));
            }, { enableHighAccuracy: true, maximumAge: 0, timeout: BROWSER_TIMEOUT_MS });
        } catch {
            finish(reject, new Error(messages[2]));
        }
    });
}
