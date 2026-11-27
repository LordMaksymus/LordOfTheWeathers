import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ErrorScreen, LoadingScreen } from './components/PopupStatus';
import { useSettings } from './hooks/useSettings';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';

function App() {
    const { status, settings, isConfigured, saveSettings, retry } = useSettings();

    if (status === 'loading') {
        return <LoadingScreen message="Loading settings…" />;
    }

    if (status === 'error') {
        return (
            <ErrorScreen
                title="Settings unavailable"
                message="The extension couldn't read your settings. Please try again."
                onRetry={retry}
            />
        );
    }

    return (
        <MemoryRouter initialEntries={[isConfigured ? '/' : '/settings']}>
            <Routes>
                <Route path="/" element={<MainPage settings={settings} />} />
                <Route path="/settings" element={(
                    <SettingsPage settings={settings} isConfigured={isConfigured} saveSettings={saveSettings} />
                )} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
