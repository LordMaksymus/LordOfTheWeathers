export const settingsMapper = {

    getHeaderData() {
        return {
            closeSettingsIcon: './assets/settingsIcon/close-settings-button.svg'
        }
    },

    getLocationSectionData() {
        return {
            notSelectedGeoIcon: './assets/settingsIcon/gray-geo-icon.svg',
            selectedGeoIcon: './assets/settingsIcon/colored-geo-icon.svg',

            notSelectedCityIcon: './assets/settingsIcon/gray-city-icon.svg',
            selectedCityIcon: './assets/settingsIcon/colored-city-icon.svg',

            notSelectedCoorIcon: './assets/settingsIcon/gray-coordinates-icon.svg',
            selectedCoorIcon: './assets/settingsIcon/colored-coordinates-icon.svg',
        }
    },

    getUnitsSectionData() {
        return {
            timeIcon: './assets/settingsIcon/time.svg',
            precipitationIcon: './assets/settingsIcon/precipitation.svg',
            tempIcon: './assets/settingsIcon/temp.svg',
            windIcon: './assets/settingsIcon/wind.svg'
        }
    }

}