import React, { useMemo, useState } from 'react';
import '../../index.css';
import DailyData from './DailyData';

const VISIBLE_DAYS = 8; // today ... today + 7 (one full week, inclusive)

function DailyDataComponent({ weekData, todayIndex = 0, selectedIndex, onPointSelect }) {
  const maxStartIndex = Math.max(0, weekData.length - VISIBLE_DAYS);
  const clampedTodayIndex = Math.min(Math.max(todayIndex, 0), maxStartIndex);

  const [startIndex, setStartIndex] = useState(clampedTodayIndex);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < maxStartIndex;

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const arrowLeftIcon = weekData[0]?.arrowLeftIcon;
  const arrowRightIcon = weekData[0]?.arrowRightIcon;

  const trackStyle = useMemo(() => ({
    width: `${(weekData.length / VISIBLE_DAYS) * 100}%`,
    transform: `translateX(-${(startIndex / weekData.length) * 100}%)`,
  }), [weekData.length, startIndex]);

  const itemStyle = useMemo(() => ({
    width: `${100 / weekData.length}%`,
  }), [weekData.length]);

  return (
    <div className="daily-data-list">
      <button
        type="button"
        className="daily-data-arrow daily-data-arrow-left"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        aria-label="Show previous day"
      >
        <img src={arrowLeftIcon} alt="" />
      </button>

      <div className="daily-data-viewport">
        <div className="daily-data-cards" style={trackStyle}>
          {weekData.map((day, i) => (
            <div className='daily-data-item' style={itemStyle} key={i}>
              <DailyData
                data={day}
                onClick={() => onPointSelect(day)}
                isSelected={selectedIndex === i} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="daily-data-arrow daily-data-arrow-right"
        onClick={scrollRight}
        disabled={!canScrollRight}
        aria-label="Show next day"
      >
        <img src={arrowRightIcon} alt="" />
      </button>
    </div>
  );
}

export default DailyDataComponent;