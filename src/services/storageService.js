// localStorage utilities para gestionar hábitos y acciones deshechas

const STORAGE_KEY = 'habits';
const HISTORY_KEY = 'habits_history';

export const storageService = {
  // Obtener todos los hábitos
  getHabits: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al obtener hábitos:', error);
      return [];
    }
  },

  // Guardar hábitos
  saveHabits: (habits) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error al guardar hábitos:', error);
    }
  },

  // Agregar nuevo hábito
  addHabit: (habit) => {
    const habits = storageService.getHabits();
    const newHabit = {
      id: Date.now().toString(),
      ...habit,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    habits.push(newHabit);
    storageService.saveHabits(habits);
    return newHabit;
  },

  // Actualizar hábito
  updateHabit: (id, updates) => {
    const habits = storageService.getHabits();
    const habitIndex = habits.findIndex((h) => h.id === id);
    if (habitIndex !== -1) {
      habits[habitIndex] = { ...habits[habitIndex], ...updates };
      storageService.saveHabits(habits);
      return habits[habitIndex];
    }
    return null;
  },

  // Marcar hábito como completado
  toggleHabitCompletion: (id, date) => {
    const habits = storageService.getHabits();
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      const dateStr = date.toISOString().split('T')[0];
      const index = habit.completedDates.indexOf(dateStr);
      if (index > -1) {
        habit.completedDates.splice(index, 1);
      } else {
        habit.completedDates.push(dateStr);
      }
      storageService.saveHabits(habits);
    }
    return habit;
  },

  // Eliminar hábito
  deleteHabit: (id) => {
    const habits = storageService.getHabits();
    const filtered = habits.filter((h) => h.id !== id);
    storageService.saveHabits(filtered);
  },

  // Historial de acciones para deshacer
  saveHistory: (action) => {
    try {
      const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      history.push({
        timestamp: Date.now(),
        ...action,
      });
      // Mantener solo los últimos 50 cambios
      if (history.length > 50) {
        history.shift();
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error al guardar historial:', error);
    }
  },

  // Obtener último cambio
  getLastAction: () => {
    try {
      const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return history.length > 0 ? history.pop() : null;
    } catch (error) {
      console.error('Error al obtener historial:', error);
      return null;
    }
  },

  // Deshacer última acción
  undo: (action) => {
    if (!action) return;

    switch (action.type) {
      case 'ADD_HABIT':
        storageService.deleteHabit(action.habitId);
        break;
      case 'DELETE_HABIT':
        storageService.saveHabits([
          ...storageService.getHabits(),
          action.habit,
        ]);
        break;
      case 'UPDATE_HABIT':
        storageService.updateHabit(action.habitId, action.previousData);
        break;
      case 'TOGGLE_COMPLETION':
        storageService.toggleHabitCompletion(
          action.habitId,
          new Date(action.date)
        );
        break;
      default:
        break;
    }
  },

  // Limpiar todo
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
  },
};
