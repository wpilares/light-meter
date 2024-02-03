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

  const printImageRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
  };

  const handleCapture = async (): Promise<void> => {
    const element = printImageRef.current;

    if (element == null) {
      console.error('Print image element is null');
      return;
    }

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    link.href = data;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="light">
      <div className="form" ref={printImageRef}>
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
      </div>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={handleCapture} className="button">
          TOMAR CAPTURA
        </button>
      </div>
    </div>
  );
}

export default App;
