import React, { useState } from 'react';

export const HabitCalendar = ({
  habit,
  onToggleCompletion,
  onShowNotification,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateStr = date.toISOString().split('T')[0];
      const isCompleted = habit.completedDates.includes(dateStr);
      const today = new Date().toISOString().split('T')[0];
      const isPending = dateStr === today && !isCompleted;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isCompleted ? 'completed' : isPending ? 'pending' : ''}`}
          onClick={() => {
            onToggleCompletion(habit.id, date);
            onShowNotification(
              'success',
              isCompleted
                ? `${habit.name} desmarcado el ${dateStr}`
                : `${habit.name} marcado el ${dateStr}`
            );
          }}
          style={{ cursor: 'pointer' }}
          title={`${dateStr}: ${isCompleted ? 'Completado' : 'No completado'}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

  return (
    <div className="calendar">
      <h3>Calendario de Cumplimiento - {habit.name}</h3>

      <div className="calendar-month">
        <button
          className="btn-secondary btn-small"
          onClick={handlePrevMonth}
        >
          ← Anterior
        </button>
        <h4>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button
          className="btn-secondary btn-small"
          onClick={handleNextMonth}
        >
          Siguiente →
        </button>
      </div>

      <div className="calendar-grid">
        {dayNames.map((day) => (
          <div key={`header-${day}`} className="calendar-header">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <div
        style={{
          marginTop: '15px',
          fontSize: '0.85em',
          color: '#666',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: '#51cf66',
              borderRadius: '4px',
              marginRight: '5px',
              verticalAlign: 'middle',
            }}
          ></span>
          Completado
        </div>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: '#ffd43b',
              borderRadius: '4px',
              marginRight: '5px',
              verticalAlign: 'middle',
            }}
          ></span>
          Hoy
        </div>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e9ecef',
              borderRadius: '4px',
              marginRight: '5px',
              verticalAlign: 'middle',
            }}
          ></span>
          No completado
        </div>
      </div>
    </div>
  );
};
