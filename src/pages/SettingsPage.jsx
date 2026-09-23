import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { settingsMapper } from '../mappers/settingsMapper';
import { useSettings } from '../hooks/useSettings';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLocationByCity } from '.././hooks/useLocation';
import HeaderSection from '../components/Settings/HeaderSection';
import LocationSection from '../components/Settings/LocationSection';
import UnitsSection from '../components/Settings/UnitsSection';

const DEFAULT_UNITS = {
    time: '24h',
    wind: 'ms',
    temperature: 'C',
    precipitation: 'mm',
};

function SettingsPage() {
    const navigate = useNavigate();

    const { requestLocation, isLoaded, error: geoError } = useGeolocation();

    const [locationMethod, setLocationMethod] = useState('geo'); // 'geo' 'city' 'coordinates'
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [units, setUnits] = useState(DEFAULT_UNITS);

    const locationByCity = useLocationByCity(city);

    const useSettingsValues = useSettings();

    useEffect(() => {
        if (useSettingsValues.isLoaded) {
            setLocationMethod(useSettingsValues.settings.locationMethod);
            setCity(useSettingsValues.settings.city);
            setLatitude(useSettingsValues.settings.latitude);
            setLongitude(useSettingsValues.settings.longitude);
            setUnits(useSettingsValues.settings.units);
        }
    }, [useSettingsValues.isLoaded]);

    if (!useSettingsValues.isLoaded) {
        return (<div className="app">
            Loading...
        </div>);
    }

    const headerData = settingsMapper.getHeaderData();
    const locationSectionData = settingsMapper.getLocationSectionData();
    const unitsSectionData = settingsMapper.getUnitsSectionData();

    const handleContinue = async () => {
        let finalSettings = {
            locationMethod: locationMethod,
            city: city,
            latitude: latitude,
            longitude: longitude,
            units: units
        }

        if (locationMethod === 'geo') {
            try {
                const coordinates = await requestLocation();
                finalSettings = { ...finalSettings, latitude: coordinates.latitude, longitude: coordinates.longitude };
            } catch (err) {
                console.log(err);
                return;
            }
        }

        if(locationMethod === 'city') {
            if (locationByCity.loading || !locationByCity.data) {
                return;
            }
            finalSettings = { ...finalSettings, latitude: locationByCity.data.lat, longitude: locationByCity.data.lon };
        }

        await useSettingsValues.saveSettings(finalSettings);
        navigate('/');
    };

    const handleClose = () => {
        if (useSettingsValues.isFirstRun) {
            window.close();
        } else {
            handleContinue();
        }
    };

    return (
        <div className="app settings-page">
            <HeaderSection data={headerData} isFirstRun={useSettingsValues.isFirstRun} onClose={handleClose} />

            <div className="settings-body">
                <LocationSection
                    data={locationSectionData}
                    method={locationMethod}
                    onMethodChange={setLocationMethod}
                    city={city}
                    onCityChange={setCity}
                    latitude={latitude}
                    longitude={longitude}
                    onLatitudeChange={setLatitude}
                    onLongitudeChange={setLongitude}
                />
                <UnitsSection data={unitsSectionData} units={units} onUnitsChange={setUnits} />
            </div>

            <button className="settings-continue-btn" onClick={handleContinue}>
                Continue
            </button>
        </div>
    );
}

export default SettingsPage;