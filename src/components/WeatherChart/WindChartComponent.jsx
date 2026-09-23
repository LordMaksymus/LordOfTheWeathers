import React from 'react';
import WindComponent from './WindComponent.jsx';
import "../../index.css";

// Это индексы в массиве данных (0, 1, 2, 3...)
const HOURS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];

export const WindChartComponent = ({ data, currentHour = null, onSelect }) => {
  return (
    <div className="wind-chart-container">
      {HOURS.map((hourIndex, index) => {
        // Берем данные по индексу из массива
        const item = data[hourIndex]; 

        if (!item) return null;

        return (
          <WindComponent
            key={hourIndex}
            data={item} // Передаем объект данных
            index={index}
            isHighlighted={hourIndex === currentHour}
            onClick={() => onSelect(item)} // Передаем объект в родитель
          />
        );
      })}
    </div>
  );
};