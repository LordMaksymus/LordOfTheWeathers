import React from 'react';

function HeaderSection({ data, isFirstRun, onClose, disabled }) {
    return (
        <header className="settings-header">
            <div className="settings-heading">
                <img className="settings-brand-icon" src="./icons/weathericon.png" alt="" />
                <h1>Settings</h1>
            </div>
            <button
                type="button"
                className="settings-close-btn"
                onClick={onClose}
                disabled={disabled}
                aria-label={isFirstRun ? 'Close app' : 'Back to weather'}
            >
                <img src={data.closeSettingsIcon} alt="" className="settings-close-icon" />
            </button>
        </header>
    );
}

export default HeaderSection;
