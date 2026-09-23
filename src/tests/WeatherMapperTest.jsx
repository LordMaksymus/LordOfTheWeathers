import { weatherMapper } from '../mappers/weatherMapper.js'; // поправь путь

// ─── Фабрика мок-данных ───────────────────────────────────────────────────────

function makeData({
    isDay = 1,
    weatherCode = 0,
    cloudCover = 20,
    windSpeed = 3,
    time = '2024-06-15T12:00',
    sunrise = '2024-06-15T05:30',
    sunset = '2024-06-15T21:00',
    pastDays = 0,
} = {}) {
    // daily[0] = день 0, daily[1] = день 1 (нужен для getDailyCloudCover → getDaily(day+1))
    const daily = [
        { time: '2024-06-15T00:00', sunrise, sunset, weatherCode, cloudCover },
        { time: '2024-06-16T00:00', sunrise, sunset, weatherCode, cloudCover },
        { time: '2024-06-17T00:00', sunrise, sunset, weatherCode, cloudCover },
    ];

    // 72 часа: день 0 (i=0..23), день 1 (i=24..47), день 2 (i=48..71)
    const hourly = Array.from({ length: 72 }, (_, i) => {
        const dayOffset = Math.floor(i / 24);
        const hour = i % 24;
        const dayNum = 15 + dayOffset;
        return {
            time: `2024-06-${String(dayNum).padStart(2, '0')}T${String(hour).padStart(2, '0')}:00`,
            weatherCode,
            cloudCover,
            windSpeed,
        };
    });

    return {
        current: { isDay, weatherCode, cloudCover, windSpeed, time },
        input: { pastDays },
        getDaily: (i) => daily[i],
        getHourly: (i) => hourly[i],
    };
}

// ─── Сценарии тестов ──────────────────────────────────────────────────────────

const CASES = [
    // getCurrentIcon
    { label: 'Day · Sunny',              fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 0,  cloudCover: 10 })] },
    { label: 'Day · Fog',                fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 45 })] },
    { label: 'Day · Cloudy low <50%',    fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 2,  cloudCover: 30, windSpeed: 3  })] },
    { label: 'Day · Cloudy low windy',   fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 2,  cloudCover: 30, windSpeed: 10 })] },
    { label: 'Day · Rain low cloud',     fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 55, cloudCover: 30 })] },
    { label: 'Day · Shower low cloud',   fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 80, cloudCover: 30 })] },
    { label: 'Day · Storm low cloud',    fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 95, cloudCover: 30 })] },
    { label: 'Day · Snow low cloud',     fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 71, cloudCover: 30 })] },
    { label: 'Day · Cloudy high >50%',   fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 2,  cloudCover: 70, windSpeed: 3  })] },
    { label: 'Day · Cloudy high windy',  fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 2,  cloudCover: 70, windSpeed: 10 })] },
    { label: 'Day · Rain high cloud',    fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 55, cloudCover: 70 })] },
    { label: 'Day · Shower high cloud',  fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 80, cloudCover: 70 })] },
    { label: 'Day · Storm high cloud',   fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 95, cloudCover: 70 })] },
    { label: 'Day · Snow high cloud',    fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 71, cloudCover: 70 })] },
    { label: 'Night · Sunny',            fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 0  })] },
    { label: 'Night · Fog',              fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 48 })] },
    { label: 'Night · Cloudy',           fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 2,  windSpeed: 3  })] },
    { label: 'Night · Cloudy windy',     fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 2,  windSpeed: 12 })] },
    { label: 'Night · Rain',             fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 55 })] },
    { label: 'Night · Shower',           fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 81 })] },
    { label: 'Night · Storm',            fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 96 })] },
    { label: 'Night · Snow',             fn: 'getCurrentIcon', args: [makeData({ isDay: 0, weatherCode: 73 })] },
    { label: 'Sunset · Sunny',           fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 0, time: '2024-06-15T21:05', sunset: '2024-06-15T21:00' })] },
    { label: 'Default (unknown code)',   fn: 'getCurrentIcon', args: [makeData({ isDay: 1, weatherCode: 42 })] },

    // getIconByHour — hour 12 = дневное время (05:30 < 12:00 < 21:00)
    { label: 'Hour 12 · Day Sunny',      fn: 'getIconByHour', args: [makeData({ weatherCode: 0,  cloudCover: 10 }), 12] },
    { label: 'Hour 12 · Day Rain low',   fn: 'getIconByHour', args: [makeData({ weatherCode: 55, cloudCover: 30 }), 12] },
    { label: 'Hour 12 · Day Rain high',  fn: 'getIconByHour', args: [makeData({ weatherCode: 55, cloudCover: 70 }), 12] },
    { label: 'Hour 2  · Night Cloudy',   fn: 'getIconByHour', args: [makeData({ weatherCode: 2,  windSpeed: 5  }), 2 ] },
    { label: 'Hour 2  · Night Rain',     fn: 'getIconByHour', args: [makeData({ weatherCode: 55             }), 2 ] },

    // getIconByDay — day=0, цикл дойдёт до daily[1].time
    { label: 'Day-0 · Sunny',            fn: 'getIconByDay',  args: [makeData({ weatherCode: 0,  cloudCover: 10 }), 0] },
    { label: 'Day-0 · Fog',              fn: 'getIconByDay',  args: [makeData({ weatherCode: 45, cloudCover: 10 }), 0] },
    { label: 'Day-0 · Cloudy low',       fn: 'getIconByDay',  args: [makeData({ weatherCode: 2,  cloudCover: 30 }), 0] },
    { label: 'Day-0 · Rain low',         fn: 'getIconByDay',  args: [makeData({ weatherCode: 55, cloudCover: 30 }), 0] },
    { label: 'Day-0 · Storm low',        fn: 'getIconByDay',  args: [makeData({ weatherCode: 95, cloudCover: 30 }), 0] },
    { label: 'Day-0 · Snow low',         fn: 'getIconByDay',  args: [makeData({ weatherCode: 71, cloudCover: 30 }), 0] },
    { label: 'Day-0 · Cloudy high',      fn: 'getIconByDay',  args: [makeData({ weatherCode: 2,  cloudCover: 80 }), 0] },
    { label: 'Day-0 · Rain high',        fn: 'getIconByDay',  args: [makeData({ weatherCode: 55, cloudCover: 80 }), 0] },
    { label: 'Day-0 · Storm high',       fn: 'getIconByDay',  args: [makeData({ weatherCode: 95, cloudCover: 80 }), 0] },
    { label: 'Day-0 · Snow high',        fn: 'getIconByDay',  args: [makeData({ weatherCode: 71, cloudCover: 80 }), 0] },
];

// ─── Прогон и сбор результатов ────────────────────────────────────────────────

const DEFAULT_ICON = '../assets/weatherIcon/no-configuration-setting-icon.svg';

function runTests() {
    return CASES.map(({ label, fn, args }) => {
        let result, error;
        try {
            result = weatherMapper[fn](...args);
        } catch (e) {
            error = e.message;
        }
        const ok = result && result !== DEFAULT_ICON;
        return { label, fn, result, error, ok };
    });
}

// ─── UI ───────────────────────────────────────────────────────────────────────

export default function WeatherMapperTest() {
    const results = runTests();
    const passed = results.filter(r => r.ok && !r.error).length;
    const failed = results.filter(r => !r.ok || r.error).length;

    return (
        <div style={{ fontFamily: 'monospace', padding: 16, background: '#0f0f0f', color: '#e0e0e0', minHeight: '100vh' }}>
            <h2 style={{ color: '#7dd3fc', marginBottom: 4 }}>weatherMapper test</h2>
            <div style={{ marginBottom: 16, fontSize: 13 }}>
                <span style={{ color: '#86efac' }}>✓ {passed} passed</span>
                {'  '}
                <span style={{ color: failed ? '#f87171' : '#86efac' }}>✗ {failed} failed</span>
                {'  '}
                <span style={{ color: '#94a3b8' }}>/ {results.length} total</span>
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 12 }}>
                <thead>
                    <tr style={{ color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid #333' }}>
                        <th style={{ padding: '4px 8px', width: 32 }}></th>
                        <th style={{ padding: '4px 8px', width: 220 }}>Сценарий</th>
                        <th style={{ padding: '4px 8px', width: 110 }}>Метод</th>
                        <th style={{ padding: '4px 8px' }}>Результат / Ошибка</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(({ label, fn, result, error, ok }) => (
                        <tr key={label} style={{ borderBottom: '1px solid #1e1e1e' }}>
                            <td style={{ padding: '3px 8px', color: error ? '#f87171' : ok ? '#86efac' : '#fbbf24' }}>
                                {error ? '✗' : ok ? '✓' : '⚠'}
                            </td>
                            <td style={{ padding: '3px 8px', color: '#e2e8f0' }}>{label}</td>
                            <td style={{ padding: '3px 8px', color: '#93c5fd' }}>{fn}</td>
                            <td style={{ padding: '3px 8px', color: error ? '#f87171' : ok ? '#86efac' : '#fbbf24', wordBreak: 'break-all' }}>
                                {error ?? result}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}