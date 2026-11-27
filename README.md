# Lord Of The Weathers

Lord Of The Weathers is a Manifest V3 browser extension that shows the weather forecast in a toolbar popup. It is built with React, Vite, and Recharts and has been tested in Brave. The browser lists it as **WeatherEx**.

## Features

- Current conditions, daily forecasts, and hourly charts for temperature, precipitation probability, and wind.
- Three location modes. Use the browser's geolocation, search by city, or enter latitude and longitude manually.
- Browser location preview with reported accuracy and confirmation before saving a newly detected position.
- Local preferences for temperature, wind speed, precipitation, and time format. Settings open on first launch, and later launches open the forecast.
- Loading feedback, input validation, and retry controls when the forecast service fails.

## Build and install

Use Node.js 20.19+ on the 20.x line or Node.js 22.12+.

```sh
git clone https://github.com/LordMaksymus/LordOfTheWeathers.git
cd LordOfTheWeathers
npm ci
npm run build
```

1. Open `brave://extensions` (or `chrome://extensions` in Chrome).
2. Enable **Developer mode** and select **Load unpacked**.
3. Select the `dist` folder and open **WeatherEx** from the toolbar.
4. Choose a location method and your preferred units. After rebuilding, use **Reload** on the extension's card to load the updated files.

## Data and preferences

Preferences are stored in the browser's local extension storage. The extension sends the selected coordinates to Open-Meteo for the forecast. It sends city searches or coordinates to Nominatim to look up locations or their names. A detected position is used for forecasts only after confirmation. You can update it from Settings or use manual coordinates.

Forecast data comes from [Open-Meteo](https://open-meteo.com/). Geocoding uses [Nominatim](https://nominatim.org/) and [© OpenStreetMap contributors](https://www.openstreetmap.org/copyright).

## License

Copyright © 2026 LordMaksymus. All rights reserved. See [LICENSE](LICENSE) for the terms covering the project's original material. Third-party components and data are subject to their respective licenses and terms.
