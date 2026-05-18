# Guía de Desarrollo - Aplicación de Seguimiento de Hábitos

## Configuración del Proyecto

Este proyecto fue creado con `create-react-app` y utiliza las últimas prácticas de desarrollo React.

## Primeros Pasos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar el Servidor de Desarrollo
```bash
npm start
```

El navegador se abrirá automáticamente en `http://localhost:3000`

### 3. Compilar para Producción
```bash
npm build
```

## Estructura de Carpetas

```
├── public/
│   └── index.html              # HTML principal
├── src/
│   ├── components/
│   │   ├── HabitForm.js        # Componente del formulario
│   │   ├── HabitCard.js        # Tarjeta de hábito individual
│   │   ├── HabitCalendar.js    # Calendario interactivo
│   │   └── Notification.js     # Notificaciones
│   ├── services/
│   │   └── storageService.js   # Servicio de localStorage
│   ├── App.js                  # Componente raíz
│   ├── index.js                # Entrada de la aplicación
│   └── index.css               # Estilos globales
├── package.json                # Dependencias del proyecto
├── README.md                   # Documentación
└── DEVELOPMENT.md              # Este archivo
```

## Características Clave Implementadas

### 1. Gestión de Estado (App.js)
- useState para hábitos, formulario, notificaciones
- Carga inicial desde localStorage
- Sincronización automática de datos

### 2. Servicio de Almacenamiento
- CRUD completo para hábitos
- Sistema de historial para deshacer
- Métodos de exportación e importación

### 3. Componentes Reutilizables
- HabitForm: Formulario de entrada validado
- HabitCard: Visualización y controles de hábitos
- HabitCalendar: Calendario interactivo por mes
- Notification: Alertas autocierre

### 4. localStorage API
- Clave: `habits` - Array de hábitos
- Clave: `habits_history` - Historial de acciones

## Desarrollo y Debugging

### Inspeccionar localStorage en el Navegador
1. Abre DevTools (F12)
2. Ve a Application > Local Storage
3. Busca las claves `habits` y `habits_history`

### Pruebas Manuales

```javascript
// En la consola del navegador, puedes:

// Ver todos los hábitos
JSON.parse(localStorage.getItem('habits'))

// Ver historial
JSON.parse(localStorage.getItem('habits_history'))

// Limpiar datos
localStorage.clear()
```

## Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Base de datos remota (Firebase, MongoDB)
- [ ] Sincronización en la nube
- [ ] Notificaciones push
- [ ] Análisis y estadísticas
- [ ] Compartir hábitos con otros usuarios
- [ ] Temas personalizables
- [ ] Recordatorios por hora
- [ ] Integración con Google Calendar
- [ ] PWA (Progressive Web App)

## Dependencias del Proyecto

```json
{
  "react": "^18.2.0",           // Librería principal
  "react-dom": "^18.2.0",       // Renderización en DOM
  "react-scripts": "5.0.1"      // Herramientas de build
}
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración (irreversible)

## Convenciones de Código

- **Componentes**: PascalCase (HabitForm.js)
- **Servicios**: camelCase con sufijo Service (storageService.js)
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Estilos**: CSS clásico en index.css

## Notas Importantes

1. **localStorage es sincrónico**: No realiza operaciones asincrónicas
2. **Límite de almacenamiento**: ~5-10MB según el navegador
3. **Persistencia**: Los datos se mantienen incluso después de cerrar el navegador
4. **Privacidad**: localStorage es específico del dominio y protocolo
5. **Desarrollo**: Los datos persisten entre recargas de página

## Solución de Problemas

### Los datos no se guardan
- Verifica que localStorage no esté deshabilitado
- Comprueba la consola para errores de almacenamiento

### El calendario no se muestra correctamente
- Asegúrate de que las fechas estén en formato ISO (YYYY-MM-DD)
- Verifica la zona horaria del servidor y cliente

### Las notificaciones no desaparecen
- Comprueba que el setTimeout se limpie correctamente
- Revisa la consola para errores de timeout

---

**Última actualización**: Mayo 2024
