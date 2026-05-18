import React, { useState, useEffect } from 'react';
import { HabitForm } from './components/HabitForm';
import { HabitCard } from './components/HabitCard';
import { Notification } from './components/Notification';
import { storageService } from './services/storageService';

function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [canUndo, setCanUndo] = useState(false);

  // Cargar hábitos al iniciar
  useEffect(() => {
    loadHabits();
    checkUndoAvailability();
  }, []);

  const loadHabits = () => {
    const loadedHabits = storageService.getHabits();
    setHabits(loadedHabits);
  };

  const checkUndoAvailability = () => {
    try {
      const history = JSON.parse(
        localStorage.getItem('habits_history') || '[]'
      );
      setCanUndo(history.length > 0);
    } catch {
      setCanUndo(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleAddHabit = (formData) => {
    const newHabit = storageService.addHabit(formData);
    
    // Guardar acción en historial
    storageService.saveHistory({
      type: 'ADD_HABIT',
      habitId: newHabit.id,
      habitData: newHabit,
      timestamp: Date.now(),
    });

    loadHabits();
    setShowForm(false);
    checkUndoAvailability();
    showNotification('success', `✓ ${formData.name} ha sido creado`);
  };

  const handleDeleteHabit = (id) => {
    const habit = habits.find((h) => h.id === id);
    
    // Guardar acción en historial
    storageService.saveHistory({
      type: 'DELETE_HABIT',
      habitId: id,
      habit: habit,
      timestamp: Date.now(),
    });

    storageService.deleteHabit(id);
    loadHabits();
    checkUndoAvailability();
  };

  const handleToggleCompletion = (habitId, date) => {
    const habit = habits.find((h) => h.id === habitId);
    const dateStr = date.toISOString().split('T')[0];
    const isCurrentlyCompleted = habit.completedDates.includes(dateStr);

    // Guardar acción en historial
    storageService.saveHistory({
      type: 'TOGGLE_COMPLETION',
      habitId: habitId,
      date: dateStr,
      wasCompleted: isCurrentlyCompleted,
      timestamp: Date.now(),
    });

    storageService.toggleHabitCompletion(habitId, date);
    loadHabits();
    checkUndoAvailability();
  };

  const handleUndo = () => {
    const lastAction = storageService.getLastAction();
    if (lastAction) {
      storageService.undo(lastAction);
      loadHabits();
      checkUndoAvailability();

      let message = 'Acción deshecha';
      if (lastAction.type === 'ADD_HABIT') {
        message = 'Creación de hábito deshecha';
      } else if (lastAction.type === 'DELETE_HABIT') {
        message = 'Eliminación de hábito deshecha';
      } else if (lastAction.type === 'TOGGLE_COMPLETION') {
        message = 'Cambio de cumplimiento deshecho';
      }

      showNotification('info', `↶ ${message}`);
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        '¿Estás seguro de que quieres eliminar todos los hábitos? Esta acción no se puede deshacer.'
      )
    ) {
      storageService.clearAll();
      loadHabits();
      setCanUndo(false);
      showNotification('warning', 'Todos los hábitos han sido eliminados');
    }
  };

  const handleExportData = () => {
    const data = {
      habits: storageService.getHabits(),
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr)
    );
    element.setAttribute('download', 'habitos-backup.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotification('success', 'Datos exportados correctamente');
  };

  return (
    <div className="container">
      <h1>🎯 Seguidor de Hábitos</h1>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="header-actions">
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancelar' : '+ Nuevo Hábito'}
        </button>
        <button
          className={`btn-warning ${!canUndo ? 'btn-disabled' : ''}`}
          onClick={handleUndo}
          disabled={!canUndo}
        >
          ↶ Deshacer
        </button>
        <button className="btn-secondary" onClick={handleExportData}>
          📥 Exportar
        </button>
        <button className="btn-danger" onClick={handleClearAll}>
          🗑️ Limpiar Todo
        </button>
      </div>

      {showForm && (
        <HabitForm
          onAdd={handleAddHabit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {habits.length > 0 ? (
        <div className="habits-section">
          <div style={{ marginBottom: '20px', color: '#666' }}>
            <strong>Total de hábitos:</strong> {habits.length}
          </div>
          <div className="habits-grid">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleCompletion={handleToggleCompletion}
                onDelete={handleDeleteHabit}
                onShowNotification={showNotification}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>📭 No hay hábitos todavía</h2>
          <p>
            Crea tu primer hábito para comenzar a seguir tu progreso
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
