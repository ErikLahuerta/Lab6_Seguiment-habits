# 🎯 Aplicación de Seguimiento de Hábitos

Una aplicación React moderna para crear, monitorear y mantener hábitos personales con un sistema de calendario visual de cumplimiento.

## ✨ Características

### 🎯 User Stories Implementadas

- **US-01**: Definir hábitos personales con nombre, descripción y frecuencia
- **US-02**: Marcar hábitos como completados diariamente
- **US-03**: Visualizar el progreso mediante calendario de cumplimiento
- **US-04**: Eliminar hábitos antiguos para mantener solo los relevantes

### 🛠️ Funcionalidades Principales

1. **Gestión de Hábitos**
   - ✅ Crear nuevos hábitos con nombre y descripción
   - ✅ Marcar hábitos como completados
   - ✅ Eliminar hábitos con confirmación
   - ✅ Ver detalles y progreso de cada hábito

2. **Calendario Visual**
   - ✅ Calendario mensual interactivo para cada hábito
   - ✅ Marcar/desmarcar fechas directamente en el calendario
   - ✅ Visualizar racha actual de cumplimiento
   - ✅ Ver tasa de cumplimiento en porcentaje

3. **Sistema de Deshacer**
   - ✅ Deshacer últimas acciones (crear, eliminar, marcar)
   - ✅ Historial de hasta 50 acciones
   - ✅ Botón deshabilitado cuando no hay acciones

4. **Persistencia de Datos**
   - ✅ Todos los datos guardados en localStorage
   - ✅ Datos accesibles después de cerrar la aplicación
   - ✅ Exportar datos a archivo JSON

5. **Retroalimentación del Usuario**
   - ✅ Notificaciones después de cada acción
   - ✅ Mensajes de confirmación para eliminaciones
   - ✅ Indicadores visuales de completamiento

## 📋 Criterios de Aceptación

- ✅ Todas las funcionalidades disponibles en interfaz principal
- ✅ Sistema de deshacer funcional
- ✅ Mensajes de confirmación después de cada acción
- ✅ Datos guardados correctamente en localStorage
- ✅ Datos accesibles posteriormente

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 14+
- npm o yarn

### Pasos de Instalación

```bash
# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm start

# Compilar para producción
npm build
```

La aplicación se abrirá en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── HabitForm.js          # Formulario para crear hábitos
│   ├── HabitCard.js          # Tarjeta individual de hábito
│   ├── HabitCalendar.js      # Calendario de cumplimiento
│   └── Notification.js       # Componente de notificaciones
├── services/
│   └── storageService.js     # Gestión de localStorage
├── App.js                    # Componente principal
├── index.js                  # Punto de entrada
└── index.css                 # Estilos globales

public/
└── index.html                # HTML principal
```

## 💾 Almacenamiento de Datos

Los datos se guardan en localStorage con las siguientes claves:

- `habits`: Array con todos los hábitos y sus fechas de cumplimiento
- `habits_history`: Historial de acciones para el sistema de deshacer

### Estructura de un Hábito

```javascript
{
  id: "timestamp",
  name: "Hacer ejercicio",
  description: "Ejercicios de 30 minutos",
  frequency: "daily",
  color: "#667eea",
  createdAt: "2024-01-15T10:30:00Z",
  completedDates: ["2024-01-15", "2024-01-16", "2024-01-17"]
}
```

## 🎨 Diseño y Interfaz

- **Paleta de Colores**: Gradientes modernos con púrpura y azul
- **Responsive Design**: Adaptable a dispositivos móviles
- **Animaciones**: Transiciones suaves para mejor UX
- **Accesibilidad**: Interfaz clara e intuitiva

## 🔧 Tecnologías Utilizadas

- **React 18**: Librería de UI
- **React DOM**: Renderización en el navegador
- **CSS3**: Estilos avanzados y grid/flexbox
- **LocalStorage API**: Persistencia de datos
- **Hooks**: useState, useEffect

## 📝 Uso de la Aplicación

### Crear un Hábito
1. Click en "+ Nuevo Hábito"
2. Completar el formulario
3. Click en "Crear Hábito"

### Marcar como Completado
1. Click en "Completar Hoy" en la tarjeta del hábito
2. O hacer click en un día específico en el calendario

### Ver Progreso
1. Click en "Ver Calendario" en la tarjeta
2. Navegar entre meses
3. Los días verdes indican cumplimiento

### Deshacer Acciones
1. Click en "↶ Deshacer" en la barra superior
2. Se revierte la última acción realizada

### Exportar Datos
1. Click en "📥 Exportar"
2. Se descarga un archivo JSON con todos los hábitos

## 🐛 Notas de Desarrollo

- Los cambios se guardan automáticamente en localStorage
- El historial de acciones se limita a 50 elementos
- Las notificaciones desaparecen automáticamente después de 4 segundos
- Los hábitos se pueden editar indirectamente mediante deshacer y recrear

## 📄 Licencia

Proyecto académico - Libre para uso educativo

---

**Desarrollado para**: Lab6 - Seguimiento de Hábitos
**Versión**: 1.0.0
**Última actualización**: 2024
