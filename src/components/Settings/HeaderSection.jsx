import React from 'react';

function HeaderSection({ disabled, formId, submitLabel }) {
    return (
        <header className="settings-header">
            <h1>Settings</h1>
            <button type="submit" form={formId} className="secondary-button settings-continue-btn" disabled={disabled}>
                {submitLabel}
            </button>
        </header>
    );
}

export default HeaderSection;
