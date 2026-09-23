import { useState, useEffect } from "react";
import browser from 'webextension-polyfill';

const DEFAULT = {
    locationMethod: "geo",
    city: "",
    latitude: "",
    longitude: "",
    units: {
        time: '24h',
        wind: 'ms',
        temperature: 'C',
        precipitation: 'mm',
    }
}

export const useSettings = () => {
    const [isFirstRun, setIsFirstRun] = useState(true);
    const [settings, setSettings] = useState(DEFAULT);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            const loadedSettings = await browser.storage.local.get('settings');
            if (loadedSettings.settings) {
                setSettings(loadedSettings.settings);
                setIsFirstRun(false);
            }
            setIsLoaded(true);
        };
        load();
    }, [])

    const saveNewSettings = async (newSettings) => {
        await browser.storage.local.set({ settings: newSettings });
        setSettings(newSettings);
        setIsFirstRun(false);
    }

    return {
        isFirstRun: isFirstRun,
        settings: settings,
        isLoaded: isLoaded,
        saveSettings: saveNewSettings
    }

}

