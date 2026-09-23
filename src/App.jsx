import React, { useState, useEffect } from 'react';
import './index.css';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';

function App() {
    return (<MemoryRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    </MemoryRouter>);
}

export default App;