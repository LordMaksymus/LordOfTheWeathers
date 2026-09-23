import React, { useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-time">{label}</div>
      <div className="chart-tooltip-value">{formatter(payload[0].value)}</div>
    </div>
  );
};

const EveryThirdLabel = ({ x, y, value, index, formatter }) => {
  if ((index + 2) % 3 !== 0) return null;
  return (
    <text
      x={x}
      y={y - 10}
      textAnchor="middle"
      fontSize={11}
      fill="var(--text-color, #e8eaed)"
    >
      {formatter ? formatter(value) : value}
    </text>
  );
};

export const PrecipitationAreaChart = ({ data, formatter, dataKey = 'precipitationProbability', onSelect }) => {
  const isFirstRender = useRef(true);

  const duration = isFirstRender.current ? 2000 : 0; // 2000ms

  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 28, right: 0, left: 0, bottom: 0 }}
        onClick={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            const index = parseInt(e.activeTooltipIndex);
            const selectedPoint = data[index];

            onSelect(selectedPoint);
          }
        }}>
        <defs>
          <linearGradient id="precipFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4dabf7" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#4dabf7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: 'var(--axis-color, #9aa0a6)' }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          domain={[0, 100]}
          hide
        />
        <Tooltip
          content={<CustomTooltip formatter={formatter} />}
          cursor={{ stroke: 'var(--axis-color, #9aa0a6)', strokeDasharray: '3 3' }}
        />
        <Area
          isAnimationActive={true}
          animationDuration={duration}
          type="monotone"
          dataKey={dataKey}
          stroke="#4dabf7"
          strokeWidth={2}
          fill="url(#precipFill)"
          dot={false}
          activeDot={{ r: 5, fill: '#4dabf7', stroke: '#1f1f1f', strokeWidth: 2 }}
          label={<EveryThirdLabel formatter={formatter} />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};