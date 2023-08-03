import './App.scss';

import React, { useRef, useState } from 'react';
import { departmentData } from './data';
import html2canvas from 'html2canvas';

function App(): React.ReactElement {
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  };

  const currentDate: string = formatDate(new Date());

  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const [isButtonVisible, setButtonVisible] = useState(true);

  const lightDivRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
  };

  const handleCapture = (): void => {
    if (lightDivRef.current != null) {
      setButtonVisible(false);

      void html2canvas(lightDivRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'captura.png';
        link.click();

        setButtonVisible(true); // Vuelve a mostrar el botón después de tomar la captura
      });
    }
  };

  return (
    <div className="light" ref={lightDivRef}>
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
        <button
          onClick={handleCapture}
          style={{ display: isButtonVisible ? 'block' : 'none' }}>
          TOMAR CAPTURA
        </button>
      </div>
    </div>
  );
}

export default App;
