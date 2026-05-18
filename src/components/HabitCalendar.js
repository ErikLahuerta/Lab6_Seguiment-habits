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

  const handleDayClick = (date, isCompleted, dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Si ya está completado hoy, mostrar advertencia
    if (isCompleted && dateStr === today) {
      onShowNotification(
        'warning',
        `⚠️ ${habit.name} ya ha sido marcado como completado hoy. Para deshacer, usa el botón "Deshacer".`
      );
      return;
    }

    // Si intenta marcar un día futuro, mostrar advertencia
    if (dateStr > today) {
      onShowNotification(
        'warning',
        '⚠️ No puedes marcar hábitos para días futuros.'
      );
      return;
    }

    onToggleCompletion(habit.id, date);
    onShowNotification(
      'success',
      isCompleted
        ? `${habit.name} desmarcado el ${dateStr}`
        : `✓ ${habit.name} marcado el ${dateStr}`
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date().toISOString().split('T')[0];

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
      const isPending = dateStr === today && !isCompleted;
      const isFuture = dateStr > today;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isCompleted ? 'completed' : isPending ? 'pending' : isFuture ? 'future' : ''}`}
          onClick={() => !isFuture && handleDayClick(date, isCompleted, dateStr)}
          style={{ cursor: isFuture ? 'not-allowed' : 'pointer' }}
          title={`${dateStr}: ${isCompleted ? 'Completado' : isFuture ? 'Futuro' : 'No completado'}`}
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

      <div className="calendar-legend">
        <div className="legend-item">
          <span style={{ background: 'linear-gradient(135deg, #51cf66, #40c057)' }}></span>
          <span>Completado</span>
        </div>
        <div className="legend-item">
          <span style={{ background: '#ffd43b' }}></span>
          <span>Hoy</span>
        </div>
        <div className="legend-item">
          <span style={{ background: 'white', border: '2px solid #e2e8f0' }}></span>
          <span>No completado</span>
        </div>
        <div className="legend-item">
          <span style={{ background: '#f0f0f0' }}></span>
          <span>Futuro</span>
        </div>
      </div>
    </div>
  );
};
