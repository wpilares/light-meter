import './App.scss';

import React, { useState } from 'react';
import { departmentData } from './data';

function App(): React.ReactElement {
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  };

  const currentDate: string = formatDate(new Date());

  const [selectedDate, setSelectedDate] = useState<string>(currentDate);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
  };

  return (
    <div className="light">
      <div className="form">
        <div className="title">Lectura Medidores</div>
        <div className="input-label">
          <label className="label">Fecha</label>
          <input
            className="input"
            type="date"
            defaultValue={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        {departmentData.map((department, index) => (
          <div className="input-label" key={index}>
            <label className="label">{department.name}</label>
            <input className="input" placeholder={department.placeholder} />
          </div>
        ))}
        <button>TOMAR CAPTURA</button>
      </div>
    </div>
  );
}

export default App;
