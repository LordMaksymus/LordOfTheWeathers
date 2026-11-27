function parseCoordinate(value, limit, label) {
    const input = typeof value === 'number' || typeof value === 'string' ? String(value).trim() : '';
    if (!input) {
        return { error: 'Enter ' + label.toLowerCase() + '.' };
    }

    const decimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;
    // Number-valued coordinates may stringify in scientific notation.
    const number = typeof value === 'number' || decimal.test(input) ? Number(input) : NaN;
    if (!Number.isFinite(number) || Math.abs(number) > limit) {
        return { error: label + ' must be a decimal number between −' + limit + ' and ' + limit + '.' };
    }

    return { value: number };
}

export function validateCoordinates(latitude, longitude) {
    const lat = parseCoordinate(latitude, 90, 'Latitude');
    const lon = parseCoordinate(longitude, 180, 'Longitude');

    return {
        coordinates: lat.error || lon.error ? null : { latitude: lat.value, longitude: lon.value },
        errors: { latitude: lat.error, longitude: lon.error },
    };
}
