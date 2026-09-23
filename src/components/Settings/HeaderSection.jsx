import React from 'react';
import '../../index.css';

function HeaderSection({ data, isFirstRun, onClose }) {
    return (
        <div className="settings-header">
            <span className="settings-header-title">Settings</span>
            <button
                className="settings-close-btn"
                onClick={onClose}
                aria-label={isFirstRun ? 'Close app' : 'Back to weather'}
            >
                <img src={data.closeSettingsIcon} alt="" className="settings-close-icon" />
            </button>
        </div>
    );
}

export default HeaderSection;