import React, { useState } from 'react';

function Day({ setSelectedDay }) {
  
  const today = new Date();
  const days = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    days.push(dayName);
  }

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleDayClick = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    setSelectedDay(dayIndex);
  };

  return (
    <>
      <div className="card-action">
        {days.map((day, index) => (
          <a
            key={index}
            href="#"
            onClick={() => handleDayClick(index)}
            className={selectedDayIndex === index ? "bold" : ""}
          >
            {day}
          </a>
        ))}
      </div>
    </>
  );
}

export default Day;
