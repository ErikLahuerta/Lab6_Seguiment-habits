// Script de prueba - Ejecuta esto en la consola para cargar datos de ejemplo

const sampleHabits = [
  {
    id: "1000",
    name: "Hacer Ejercicio",
    description: "Ejercicio cardio de 30 minutos por la mañana",
    frequency: "daily",
    color: "#667eea",
    createdAt: "2024-01-15T10:30:00Z",
    completedDates: [
      "2024-01-15",
      "2024-01-16",
      "2024-01-17",
      "2024-01-18",
      "2024-01-19",
    ],
  },
  {
    id: "1001",
    name: "Leer",
    description: "Leer 30 páginas de un libro",
    frequency: "daily",
    color: "#ff6b6b",
    createdAt: "2024-01-14T09:00:00Z",
    completedDates: [
      "2024-01-15",
      "2024-01-16",
      "2024-01-17",
      "2024-01-18",
    ],
  },
  {
    id: "1002",
    name: "Meditar",
    description: "Meditación de 10 minutos",
    frequency: "daily",
    color: "#51cf66",
    createdAt: "2024-01-13T08:00:00Z",
    completedDates: [
      "2024-01-15",
      "2024-01-16",
      "2024-01-17",
      "2024-01-18",
      "2024-01-19",
    ],
  },
  {
    id: "1003",
    name: "Agua",
    description: "Beber 2 litros de agua",
    frequency: "daily",
    color: "#ffa502",
    createdAt: "2024-01-10T07:00:00Z",
    completedDates: [
      "2024-01-15",
      "2024-01-16",
      "2024-01-17",
      "2024-01-18",
    ],
  },
];

// Cargar datos de ejemplo
function loadSampleData() {
  localStorage.setItem("habits", JSON.stringify(sampleHabits));
  console.log("Datos de ejemplo cargados correctamente");
  console.log("Recarga la página para ver los cambios");
}

// Limpiar todos los datos
function clearAllData() {
  localStorage.removeItem("habits");
  localStorage.removeItem("habits_history");
  console.log("Todos los datos han sido eliminados");
  console.log("Recarga la página para ver los cambios");
}

// Ver todos los hábitos
function viewHabits() {
  const habits = JSON.parse(localStorage.getItem("habits") || "[]");
  console.table(habits);
  return habits;
}

// Ver historial de acciones
function viewHistory() {
  const history = JSON.parse(localStorage.getItem("habits_history") || "[]");
  console.table(history);
  return history;
}

// Exportar como JSON
function exportData() {
  const data = {
    habits: JSON.parse(localStorage.getItem("habits") || "[]"),
    exportDate: new Date().toISOString(),
  };
  console.log(JSON.stringify(data, null, 2));
  return data;
}

// Instrucciones de uso
console.log(`
╔════════════════════════════════════════════════════════════╗
║    UTILIDADES DE PRUEBA - RASTREADOR DE HÁBITOS           ║
╚════════════════════════════════════════════════════════════╝

Comandos disponibles:

1. loadSampleData()     - Carga hábitos de ejemplo
2. clearAllData()       - Elimina todos los datos
3. viewHabits()         - Muestra todos los hábitos
4. viewHistory()        - Muestra el historial de acciones
5. exportData()         - Exporta los datos como JSON

Ejemplos:
- loadSampleData()      // Carga 4 hábitos de ejemplo
- clearAllData()        // Limpia localStorage completamente
- viewHabits()          // Muestra tabla con todos los hábitos
`);
