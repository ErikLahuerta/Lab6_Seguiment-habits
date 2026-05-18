import React, { useState } from 'react';

export const HabitForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    color: '#667eea',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
      alert('Por favor, ingresa un nombre para el hábito');
      return;
    }
    onAdd(formData);
    setFormData({
      name: '',
      description: '',
      frequency: 'daily',
      color: '#667eea',
    });
  };

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>
        Crear Nuevo Hábito
      </h2>

      <div className="form-group">
        <label htmlFor="name">Nombre del Hábito *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Hacer ejercicio"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe tu hábito..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="frequency">Frecuencia</label>
        <select
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        >
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '50px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
          }}
        />
      </div>

      <div className="form-buttons">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Crear Hábito
        </button>
      </div>
    </form>
  );
};
