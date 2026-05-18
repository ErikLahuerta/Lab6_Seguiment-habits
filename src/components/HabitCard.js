import React, { useState } from 'react';
import { HabitCalendar } from './HabitCalendar';

export const HabitCard = ({
  habit,
  onToggleCompletion,
  onDelete,
  onShowNotification,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleToggleCompletion = () => {
    const today = new Date();
    onToggleCompletion(habit.id, today);
    const isCompleted = habit.completedDates.includes(
      today.toISOString().split('T')[0]
    );
    onShowNotification(
      `success`,
      isCompleted
        ? `${habit.name} desmarcado como completado`
        : `${habit.name} marcado como completado`
    );
  };

  const handleDelete = () => {
    if (
      window.confirm(`¿Estás seguro de que quieres eliminar "${habit.name}"?`)
    ) {
      onDelete(habit.id);
      onShowNotification('info', `${habit.name} ha sido eliminado`);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);

  const currentStreak = calculateStreak(habit.completedDates);
  const completionRate = calculateCompletionRate(habit.completedDates);

  return (
    <div className="habit-card">
      <div className="habit-header">
        <h3 className="habit-title">{habit.name}</h3>
        <span className="habit-streak">🔥 {currentStreak}</span>
      </div>

      {habit.description && (
        <p className="habit-description">{habit.description}</p>
      )}

      <div className="habit-stats">
        <div className="stat">
          <div className="stat-label">Completadas</div>
          <div className="stat-value">{habit.completedDates.length}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Tasa</div>
          <div className="stat-value">{completionRate}%</div>
        </div>
      </div>

      <div className="habit-actions">
        <button
          className={`btn-primary btn-small ${isCompletedToday ? 'btn-success' : ''}`}
          onClick={handleToggleCompletion}
          style={{
            background: isCompletedToday
              ? 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)'
              : undefined,
          }}
        >
          {isCompletedToday ? '✓ Hoy Completado' : 'Completar Hoy'}
        </button>
        <button
          className="btn-secondary btn-small"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {showCalendar ? 'Ocultar' : 'Ver'} Calendario
        </button>
      </div>

      <button
        className="btn-danger btn-small"
        style={{ width: '100%' }}
        onClick={handleDelete}
      >
        Eliminar Hábito
      </button>

      {showCalendar && (
        <HabitCalendar
          habit={habit}
          onToggleCompletion={onToggleCompletion}
          onShowNotification={onShowNotification}
        />
      )}
    </div>
  );
};

// Calcular la racha actual
const calculateStreak = (completedDates) => {
  if (completedDates.length === 0) return 0;

  const sorted = completedDates.sort().reverse();
  let streak = 0;
  let currentDate = new Date();

  for (let i = 0; i < sorted.length; i++) {
    const completedDate = new Date(sorted[i]);
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (
      completedDate.toISOString().split('T')[0] ===
      expectedDate.toISOString().split('T')[0]
    ) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Calcular tasa de cumplimiento
const calculateCompletionRate = (completedDates) => {
  if (completedDates.length === 0) return 0;

  const oldest = new Date(completedDates.sort()[0]);
  const today = new Date();
  const daysDiff = Math.ceil(
    (today - oldest) / (1000 * 60 * 60 * 24)
  );
  const rate = Math.round((completedDates.length / (daysDiff + 1)) * 100);

  return Math.min(rate, 100);
};
