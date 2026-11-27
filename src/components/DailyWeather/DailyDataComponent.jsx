import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../../index.css';
import DailyData from './DailyData';

const MAX_VISIBLE_DAYS = 8;
const MIN_DAY_WIDTH = 84;

function DailyDataComponent({ weekData, todayIndex = 0, selectedIndex, onPointSelect }) {
  const viewport = useRef(null);
  const [visibleDays, setVisibleDays] = useState(MAX_VISIBLE_DAYS);
  const [requestedStartIndex, setStartIndex] = useState(todayIndex);
  const maxStartIndex = Math.max(0, weekData.length - visibleDays);
  const startIndex = Math.min(Math.max(requestedStartIndex, 0), maxStartIndex);

  useLayoutEffect(() => {
    const element = viewport.current;
    const measure = () => {
      const days = Math.floor(element.clientWidth / MIN_DAY_WIDTH);
      setVisibleDays(Math.max(1, Math.min(MAX_VISIBLE_DAYS, days)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < maxStartIndex;

  const scrollLeft = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const scrollRight = () => {
    setStartIndex(Math.min(maxStartIndex, startIndex + 1));
  };

  const arrowLeftIcon = weekData[0]?.arrowLeftIcon;
  const arrowRightIcon = weekData[0]?.arrowRightIcon;

  const trackStyle = useMemo(() => ({
    width: `${(weekData.length / visibleDays) * 100}%`,
    transform: `translateX(-${(startIndex / weekData.length) * 100}%)`,
  }), [weekData.length, startIndex, visibleDays]);

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

      <div className="daily-data-viewport" ref={viewport}>
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
