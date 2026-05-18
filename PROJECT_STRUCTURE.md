# 📂 Estructura del Proyecto

```
Lab6_Seguimiento-habits/
│
├── 📁 public/
│   └── index.html                 # Página HTML principal
│
├── 📁 src/
│   │
│   ├── 📁 components/             # Componentes React
│   │   ├── HabitForm.js           # Formulario para crear hábitos
│   │   ├── HabitCard.js           # Tarjeta individual de hábito
│   │   ├── HabitCalendar.js       # Calendario mensual interactivo
│   │   └── Notification.js        # Componente de notificaciones
│   │
│   ├── 📁 services/               # Servicios (lógica de negocio)
│   │   └── storageService.js      # Gestión de localStorage
│   │
│   ├── App.js                     # Componente raíz de la app
│   ├── index.js                   # Punto de entrada de React
│   └── index.css                  # Estilos globales
│
├── 📄 package.json                # Dependencias y scripts
├── 📄 .gitignore                  # Archivos a ignorar en git
├── 📄 .npmrc                       # Configuración de npm
│
├── 📖 README.md                   # Documentación general
├── 📖 QUICKSTART.md               # Guía de inicio rápido
├── 📖 DEVELOPMENT.md              # Guía para desarrolladores
├── 📖 TESTING.md                  # Guía de pruebas
└── 🧪 test-utils.js              # Utilidades para pruebas
```

## Descripción de Archivos

### Raíz del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias, versión y scripts de npm |
| `.gitignore` | Archivos a no versionar en git |
| `.npmrc` | Configuración de npm |
| `README.md` | Documentación principal |
| `QUICKSTART.md` | Guía rápida de uso |
| `DEVELOPMENT.md` | Documentación para desarrolladores |
| `TESTING.md` | Guía completa de pruebas |
| `test-utils.js` | Comandos para pruebas en consola |

### Carpeta `/public`

| Archivo | Propósito |
|---------|-----------|
| `index.html` | HTML base donde React se monta |

### Carpeta `/src`

#### Archivo Principal

| Archivo | Propósito |
|---------|-----------|
| `App.js` | Componente raíz que orquesta toda la app |
| `index.js` | Punto de entrada que monta React en el DOM |
| `index.css` | Estilos globales (responsive, animaciones, etc) |

#### Carpeta `/components`

| Componente | Responsabilidad |
|-----------|-----------------|
| `HabitForm.js` | Formulario validado para crear hábitos |
| `HabitCard.js` | Visualización individual de hábito con controles |
| `HabitCalendar.js` | Calendario mensual interactivo |
| `Notification.js` | Notificación auto-cierre con tipología |

#### Carpeta `/services`

| Servicio | Responsabilidad |
|----------|-----------------|
| `storageService.js` | CRUD completo + historial de cambios |

## Flujo de Datos

```
App.js (Estado Global)
    ↓
    ├→ HabitForm (Crea hábitos)
    │   └→ storageService.addHabit()
    │
    ├→ HabitCard[] (Muestra hábitos)
    │   ├→ Controles de UI
    │   └→ HabitCalendar (Calendario)
    │       ├→ storageService.toggleHabitCompletion()
    │       └→ storageService.updateHabit()
    │
    └→ Notification (Retroalimentación)
        └→ storageService.saveHistory()
```

## Almacenamiento en localStorage

```javascript
// localStorage.getItem('habits')
[
  {
    id: "1000",
    name: "Hacer Ejercicio",
    description: "30 minutos diarios",
    frequency: "daily",
    color: "#667eea",
    createdAt: "2024-01-15T10:30:00Z",
    completedDates: ["2024-01-15", "2024-01-16"]
  },
  // ... más hábitos
]

// localStorage.getItem('habits_history')
[
  {
    timestamp: 1705318800000,
    type: "ADD_HABIT",
    habitId: "1000",
    habitData: { ... }
  },
  // ... más acciones
]
```

## Ciclo de Vida de una Acción

1. **Usuario interactúa** → Click en botón
2. **Evento dispara acción** → handleAddHabit(), etc
3. **Guardar en historial** → storageService.saveHistory()
4. **Actualizar storage** → storageService.saveHabits()
5. **Recargar estado** → loadHabits()
6. **Re-renderizar** → React actualiza UI
7. **Mostrar notificación** → showNotification()
8. **Actualizar "Deshacer"** → checkUndoAvailability()

## Estilos CSS

Los estilos están organizados por:

- **Reset Global** - Margin, padding, box-sizing
- **Layout Principal** - Container, gradientes
- **Componentes** - Botones, formularios, tarjetas
- **Estado Visual** - Hover, active, disabled
- **Animaciones** - Transiciones suaves
- **Responsive** - Media queries para mobile

## Características Técnicas

### React Hooks Utilizados
- `useState` - Gestión de estado local
- `useEffect` - Efectos secundarios y carga inicial

### APIs del Navegador
- `localStorage` - Persistencia de datos
- `JSON.parse/stringify` - Serialización
- `Date` - Manejo de fechas
- `setTimeout/clearTimeout` - Timers

### Patrones de Diseño
- **Componentes Funcionales** - Toda la app usa componentes funcionales
- **Context implícito** - Props drilling controlado
- **Single Responsibility** - Cada componente tiene una responsabilidad
- **Service Layer** - Separación de lógica de negocio

## Contribución

Si deseas agregar nuevas funcionalidades:

1. Crea un nuevo componente en `/src/components/`
2. Agrega métodos en `storageService.js` si necesitas persistencia
3. Actualiza `App.js` para integrar la nueva funcionalidad
4. Actualiza la documentación

---

**Última actualización**: Mayo 2024
