# 🧪 Guía de Pruebas - Rastreador de Hábitos

Esta guía te ayudará a probar todas las funcionalidades de la aplicación.

## Requisitos
- Node.js instalado
- npm o yarn
- Navegador web moderno

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la aplicación
npm start

# La aplicación se abrirá en http://localhost:3000
```

## Pruebas de Funcionalidad

### ✅ Test 1: Crear un Hábito (US-01)

**Pasos:**
1. Click en "+ Nuevo Hábito"
2. Completa el formulario:
   - Nombre: "Hacer ejercicio"
   - Descripción: "30 minutos de actividad física"
   - Frecuencia: "Diario"
   - Color: Elige uno
3. Click en "Crear Hábito"

**Resultado Esperado:**
- ✓ Aparece notificación verde "✓ Hacer ejercicio ha sido creado"
- ✓ El hábito aparece en la grilla
- ✓ El formulario se cierra
- ✓ El botón "Deshacer" se habilita

**Datos Guardados:**
- localStorage ahora contiene el hábito en clave `habits`

---

### ✅ Test 2: Marcar Hábito como Completado (US-02)

**Pasos:**
1. En la tarjeta del hábito creado
2. Click en "Completar Hoy"

**Resultado Esperado:**
- ✓ El botón cambia a "✓ Hoy Completado" (color verde)
- ✓ Aparece notificación: "Hacer ejercicio marcado como completado"
- ✓ En la tarjeta, el contador "Completadas" aumenta a 1

**Con Calendario:**
1. Click en "Ver Calendario" en la tarjeta
2. El día actual está marcado en verde
3. Click nuevamente en "Hoy" para desmarcar

**Resultado Esperado:**
- ✓ El día se marca/desmarca en verde
- ✓ Actualización en tiempo real
- ✓ Notificación de cambio

---

### ✅ Test 3: Ver Calendario de Cumplimiento (US-03)

**Pasos:**
1. En la tarjeta de un hábito, click en "Ver Calendario"
2. Observa el calendario del mes actual
3. Navega con "← Anterior" y "Siguiente →"

**Resultado Esperado:**
- ✓ Calendario mensual se muestra
- ✓ Días completados en color verde
- ✓ Hoy en color amarillo
- ✓ Los botones de navegación funcionan
- ✓ Puedes hacer click en cualquier día para marcar/desmarcar

**Elementos Visibles:**
- ✓ Leyenda con colores
- ✓ Racha actual en la tarjeta (🔥 X)
- ✓ Tasa de cumplimiento en %

---

### ✅ Test 4: Eliminar Hábito (US-04)

**Pasos:**
1. En la tarjeta de un hábito, scroll hasta abajo
2. Click en "Eliminar Hábito"
3. Confirmar en el diálogo

**Resultado Esperado:**
- ✓ Aparece diálogo de confirmación
- ✓ Al confirmar, notificación azul: "Hacer ejercicio ha sido eliminado"
- ✓ El hábito desaparece de la grilla
- ✓ El botón "Deshacer" se habilita

**Recuperación:**
- ✓ Click en "↶ Deshacer"
- ✓ El hábito reaparece
- ✓ Notificación: "Eliminación de hábito deshecha"

---

### ✅ Test 5: Sistema de Deshacer

**Pasos Generales:**
1. Realiza cualquier acción (crear, eliminar, marcar)
2. Observa que el botón "↶ Deshacer" se habilita
3. Click en "Deshacer"

**Acciones Reversibles:**
- ✓ Crear hábito → Deshacer → Se elimina
- ✓ Eliminar hábito → Deshacer → Se recupera
- ✓ Marcar cumplimiento → Deshacer → Se desmarca
- ✓ Múltiples deshacer en secuencia

**Resultado Esperado:**
- ✓ Se revierte la última acción
- ✓ Notificación describe qué se deshizo
- ✓ El estado vuelve al anterior

---

### ✅ Test 6: Notificaciones

**Pasos:**
1. Realiza cualquier acción

**Resultado Esperado:**
- ✓ Aparece notificación arriba con animación
- ✓ Color según tipo (verde/azul/rojo)
- ✓ Auto-cierre después de 4 segundos
- ✓ Se puede cerrar manualmente con ✕

---

### ✅ Test 7: Persistencia de Datos

**Pasos:**
1. Crea 2-3 hábitos
2. Marca algunos como completados
3. Cierra completamente la pestaña del navegador
4. Reabre la aplicación

**Resultado Esperado:**
- ✓ Los hábitos siguen ahí
- ✓ Los cumplimientos están guardados
- ✓ Las fechas de cumplimiento se mantienen

**Inspección en DevTools:**
1. F12 → Application → Local Storage
2. Busca `habits` y `habits_history`
3. Verifica el JSON guardado

---

### ✅ Test 8: Exportar Datos

**Pasos:**
1. Crea varios hábitos
2. Click en "📥 Exportar"

**Resultado Esperado:**
- ✓ Se descarga archivo `habitos-backup.json`
- ✓ Notificación: "Datos exportados correctamente"
- ✓ Archivo contiene fecha de exportación y hábitos

---

### ✅ Test 9: Limpiar Todo

**Pasos:**
1. Click en "🗑️ Limpiar Todo"
2. Confirmar en diálogo

**Resultado Esperado:**
- ✓ Diálogo de confirmación aparece
- ✓ Al confirmar, todos los hábitos se eliminan
- ✓ Aparece estado vacío: "📭 No hay hábitos todavía"
- ✓ localStorage se limpia completamente

---

### ✅ Test 10: Interfaz Responsiva

**Pasos:**
1. Abre las DevTools (F12)
2. Click en icono responsive (Ctrl+Shift+M)
3. Prueba en diferentes tamaños:
   - Móvil (375px)
   - Tablet (768px)
   - Desktop (1920px)

**Resultado Esperado:**
- ✓ La interfaz se adapta correctamente
- ✓ Botones y formularios se ven bien
- ✓ Calendario es legible
- ✓ No hay overflow horizontal

---

## Pruebas con Datos de Ejemplo

### Cargar Datos de Ejemplo

1. Abre la consola del navegador (F12 → Console)
2. Copia y pega el contenido de `test-utils.js`
3. Ejecuta: `loadSampleData()`
4. Recarga la página

**Se crearán 4 hábitos de ejemplo:**
- Hacer Ejercicio
- Leer
- Meditar
- Agua

### Comandos Útiles

```javascript
// Ver todos los hábitos
viewHabits()

// Ver historial de acciones
viewHistory()

// Exportar como JSON
exportData()

// Limpiar todo
clearAllData()
```

---

## Lista de Verificación Final

- [ ] ✅ Crear hábito funciona
- [ ] ✅ Marcar como completado funciona
- [ ] ✅ Calendario muestra correctamente
- [ ] ✅ Deshacer revierte acciones
- [ ] ✅ Notificaciones aparecen
- [ ] ✅ Datos se guardan en localStorage
- [ ] ✅ Datos persisten después de cerrar
- [ ] ✅ Exportar descarga archivo
- [ ] ✅ Limpiar todo elimina datos
- [ ] ✅ Interfaz responde correctamente
- [ ] ✅ Sin errores en consola
- [ ] ✅ Todos los botones funcionan

---

## Solución de Problemas

### El formulario no envía
- Verifica que el nombre no esté vacío
- Mira la consola para errores

### Los datos no se guardan
- Verifica en DevTools > Application > Local Storage
- Asegúrate que localStorage no está deshabilitado
- Prueba en incógnito

### El calendario muestra mal
- Verifica que las fechas estén en formato ISO
- Comprueba la zona horaria del sistema

### Los botones no responden
- Recarga la página
- Limpia el caché (Ctrl+Shift+Delete)
- Prueba en otra pestaña incógnito

---

**¡Listo para probar!** 🚀
