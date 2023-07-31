import './App.scss';

import React, { useState } from 'react';
import { departmentData } from './data';

function App(): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState<string>('');

  console.log(new Date());

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
    console.log('Fecha seleccionada:', dateValue);
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
            value={selectedDate}
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
