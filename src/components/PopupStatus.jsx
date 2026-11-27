import React from 'react';

export function LoadingScreen({ message }) {
    return (
        <div className="app popup-status" role="status">
            <div className="weather-loader" aria-hidden="true">
                <img src="./assets/weatherIcon/day/lowCloudyIcons/cloudy/day-cloudy-color-icon.svg" alt="" />
            </div>
            <p>{message}</p>
        </div>
    );
}

export function ErrorScreen({ title, message, onRetry, onOpenSettings }) {
    return (
        <div className="app popup-status">
            <div className="popup-error" role="alert">
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
            <div className="popup-status-actions">
                {onRetry && <button type="button" className="primary-button" onClick={onRetry}>Retry</button>}
                {onOpenSettings && (
                    <button type="button" className="secondary-button" onClick={onOpenSettings}>Open settings</button>
                )}
            </div>
        </div>
    );
}
