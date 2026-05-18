import React, { useState } from 'react';

export const HabitForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    color: '#667eea',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del hábito es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (formData.description.trim().length > 200) {
      newErrors.description = 'La descripción no puede exceder 200 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(formData);
    setFormData({
      name: '',
      description: '',
      frequency: 'daily',
      color: '#667eea',
    });
    setErrors({});
  };

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      <h2>📝 Crear Nuevo Hábito</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre del Hábito *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Hacer ejercicio, Meditar, Leer..."
          required
        />
        {errors.name && (
          <div className="form-error">❌ {errors.name}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Descripción ({formData.description.length}/200)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe tus objetivos..."
          maxLength="200"
        />
        {errors.description && (
          <div className="form-error">❌ {errors.description}</div>
        )}
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
          <option value="daily">📅 Diario</option>
          <option value="weekly">📆 Semanal</option>
          <option value="monthly">📋 Mensual</option>
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
          ✓ Crear Hábito
        </button>
      </div>
    </form>
  );
};
