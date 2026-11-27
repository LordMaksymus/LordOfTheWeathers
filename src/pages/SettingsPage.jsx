import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsMapper } from '../mappers/settingsMapper';
import { requestLocation } from '../services/GeolocationService';
import { getLocationByCity } from '../services/LocationService';
import { describeRequestError } from '../services/fetchJson';
import { validateCoordinates } from '../utils/coordinates';
import HeaderSection from '../components/Settings/HeaderSection';
import LocationSection from '../components/Settings/LocationSection';
import UnitsSection from '../components/Settings/UnitsSection';

function SettingsPage({ settings, isConfigured, saveSettings }) {
    const navigate = useNavigate();
    const [locationMethod, setLocationMethod] = useState(settings.locationMethod);
    const [city, setCity] = useState(settings.city);
    const [latitude, setLatitude] = useState(settings.locationMethod === 'geo' ? '' : settings.latitude);
    const [longitude, setLongitude] = useState(settings.locationMethod === 'geo' ? '' : settings.longitude);
    const [units, setUnits] = useState(settings.units);
    const savedGeoPosition = isConfigured && settings.locationMethod === 'geo'
        ? { latitude: settings.latitude, longitude: settings.longitude }
        : null;
    const [detectedPosition, setDetectedPosition] = useState(null);
    const geoPosition = detectedPosition ?? savedGeoPosition;
    const [errors, setErrors] = useState({});
    const [pending, setPending] = useState('');
    const form = useRef(null);
    const previousErrors = useRef({});
    const activeRequest = useRef(null);
    const resolvedCity = useRef(null);

    useEffect(() => () => activeRequest.current?.abort(), []);

    useEffect(() => {
        const newInvalidField = ['city', 'latitude', 'longitude']
            .find(field => errors[field] && errors[field] !== previousErrors.current[field]);
        previousErrors.current = errors;

        if (newInvalidField) {
            const input = form.current.elements.namedItem(newInvalidField);
            input?.focus({ preventScroll: true });
            input?.parentElement.scrollIntoView({ block: 'nearest' });
        }
    }, [errors]);

    async function runAction(action) {
        if (activeRequest.current) return;
        const controller = new AbortController();
        activeRequest.current = controller;
        setErrors({});

        try {
            await action(controller.signal);
        } finally {
            if (!controller.signal.aborted) setPending('');
            activeRequest.current = null;
        }
    }

    async function locate(signal) {
        setPending('Finding your location…');
        setDetectedPosition(null);
        try {
            const position = await requestLocation(signal);
            if (!signal.aborted) setDetectedPosition(position);
        } catch (error) {
            if (!signal.aborted) setErrors({ geo: error.message });
        }
    }

    async function searchCity(cityName, signal) {
        if (!cityName) {
            setErrors({ city: 'Enter a city name.' });
            return null;
        }
        if (resolvedCity.current?.city === cityName) return resolvedCity.current.coordinates;
        if (settings.locationMethod === 'city' && settings.city === cityName && isConfigured) {
            return { latitude: settings.latitude, longitude: settings.longitude };
        }

        setPending('Searching for the city…');
        try {
            const coordinates = await getLocationByCity(cityName, signal);
            if (signal.aborted) return null;
            if (!coordinates) {
                setErrors({ city: 'City not found. Check the spelling or try another city.' });
                return null;
            }
            resolvedCity.current = { city: cityName, coordinates };
            return coordinates;
        } catch (error) {
            if (!signal.aborted) setErrors({ city: describeRequestError(error, 'city search') });
            return null;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        return runAction(async signal => {
            const cityName = locationMethod === 'city' ? city.trim() : '';
            let coordinates;
            if (locationMethod === 'city') {
                coordinates = await searchCity(cityName, signal);
            } else if (locationMethod === 'geo') {
                if (!geoPosition) {
                    await locate(signal);
                    return;
                }
                const { latitude, longitude } = geoPosition;
                coordinates = { latitude, longitude };
            } else {
                const validation = validateCoordinates(latitude, longitude);
                coordinates = validation.coordinates;
                if (!coordinates) setErrors(validation.errors);
            }
            if (!coordinates || signal.aborted) return;

            setPending('Saving settings…');
            try {
                await saveSettings({ locationMethod, city: cityName, ...coordinates, units });
                if (!signal.aborted) navigate('/', { replace: true });
            } catch {
                if (!signal.aborted) setErrors({ save: 'Settings couldn’t be saved. Try again.' });
            }
        });
    }

    function changeLocationMethod(value) {
        setLocationMethod(value);
        setDetectedPosition(null);
        setErrors({});
    }

    function handleClose() {
        if (isConfigured) navigate('/', { replace: true });
        else window.close();
    }

    return (
        <div className="app settings-page">
            <HeaderSection
                data={settingsMapper.getHeaderData()}
                isFirstRun={!isConfigured}
                onClose={handleClose}
                disabled={Boolean(pending)}
            />

            <form ref={form} className="settings-form" onSubmit={handleSubmit} noValidate>
                <fieldset className="settings-body" disabled={Boolean(pending)} aria-label="Weather preferences">
                    <LocationSection
                        data={settingsMapper.getLocationSectionData()}
                        method={locationMethod}
                        onMethodChange={changeLocationMethod}
                        city={city}
                        onCityChange={value => {
                            resolvedCity.current = null;
                            setCity(value);
                            setErrors({});
                        }}
                        latitude={latitude}
                        longitude={longitude}
                        onLatitudeChange={value => {
                            setLatitude(value);
                            setErrors(current => ({ ...current, latitude: undefined, save: undefined }));
                        }}
                        onLongitudeChange={value => {
                            setLongitude(value);
                            setErrors(current => ({ ...current, longitude: undefined, save: undefined }));
                        }}
                        geoPosition={geoPosition}
                        onLocate={() => runAction(locate)}
                        errors={errors}
                    />
                    <UnitsSection data={settingsMapper.getUnitsSectionData()} units={units} onUnitsChange={setUnits} />
                </fieldset>

                <div className="settings-footer">
                    <div className="settings-footer-feedback">
                        {pending && (
                            <p className="settings-progress" role="status">
                                <span className="progress-dot" aria-hidden="true" />
                                {pending}
                            </p>
                        )}
                        {errors.save && <p className="field-error" role="alert">{errors.save}</p>}
                    </div>
                    <button type="submit" className="primary-button settings-continue-btn" disabled={Boolean(pending)}>
                        {locationMethod === 'geo' && detectedPosition
                            ? 'Use this location'
                            : isConfigured ? 'Save' : 'Continue'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SettingsPage;
