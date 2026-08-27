---
name: mockup-ui
description: Guidelines and conventions for layout design, mockup implementation, UI layout, CSS styles, Tailwind CSS v4, daisyUI, accessibility (A11Y), form inputs, buttons, and static data rendering in Lucemedic.
---

# Guía de Maquetación de UI y Diseño (Mockup UI)

Esta skill guía al agente en la maquetación y desarrollo de interfaces visuales interactivas en Lucemedic, asegurando consistencia visual, semántica y alto rendimiento.

---

## 1. Reglas de Layout y Resolución

- **Resolución Objetivo**: Diseñar y maquetar **únicamente para resolución de 1920 x 1080 (16:9)**. No implementar diseño responsive adaptable (a menos que sea solicitado explícitamente).
- **Tipografía y Tamaño Base**:
  - El tamaño de texto base para toda la maquetación debe ser `text-xs`.
  - La jerarquía tipográfica debe respetarse de forma estricta (usar pesos semibold, bold, y colores atenuados para metadatos).
- **Consistencia CSS**:
  - Usar clases utilitarias nativas de Tailwind CSS v4 (`flex`, `grid`, `gap-X`, `p-X`, `m-X`).
  - Evitar estilos personalizados en hojas de estilo o clases arbitrarias inline (`w-[250px]`) cuando existan alternativas estándar de Tailwind (`w-60`, `w-64`).

---

## 2. Tablas y Rejillas de Datos

- **No usar etiquetas `<table>` HTML tradicionales**: Diseñar las tablas utilizando contenedores `grid` o `flexbox` de Tailwind para un control de maquetación preciso y consistencia visual con el resto del ERP.
- **Formato Estándar de Fila**:
  - Asignar una altura fija o predecible a las filas de la tabla.
  - Usar cabeceras en mayúsculas con texto pequeño y opaco (`text-gray-500 font-semibold uppercase tracking-wider`).

---

## 3. Botones y Elementos Interactivos

- **Propiedad `type` en Botones**: Todos los botones que se declaren en el código deben tener la propiedad `type` explícita para evitar envíos incidentales de formularios:
  ```tsx
  // Botones de acción general (no envían el formulario)
  <button type="button" onClick={handleAction}>Acción</button>

  // Botón de submit del formulario
  <button type="submit">Guardar</button>
  ```
- **Botones con Iconos**: Utilizar iconos de Font Awesome 6 de la siguiente manera:
  ```tsx
  <button type="button" className="btn-icon">
    <i className="fa-solid fa-plus mr-1" /> Nuevo Registro
  </button>
  ```

---

## 4. Manejo de Datos Estáticos

Si necesitas mostrar listas, tablas de referencia o datos de prueba repetitivos:

1. Crea un array[] y consúmelo usando `.map()` garantizando que cada elemento tenga una `key` única basada en su ID:
   ```typescript
    const items = [
      { id: 1, name: "Item 1", description: "Descripción del Item 1" },
      { id: 2, name: "Item 2", description: "Descripción del Item 2" },
      { id: 3, name: "Item 3", description: "Descripción del Item 3" },
    ]
   export function DashboardList() {
     return (
       <div className="space-y-2">
         {items.map((item) => (
           <DashboardItem key={item.id} {...item} />
         ))}
       </div>
     )
   }
   ```

---

## 5. Accesibilidad (A11Y) - Lista de Control

- **Etiquetado Semántico**: Utilizar elementos semánticos de HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`) para estructurar la página en lugar de `<div>` anidados.
- **Asociación de Inputs**: Asociar siempre `<label htmlFor="id-campo">` con `<input id="id-campo">`.
- **Aria-invalid**: Al utilizar React Hook Form, marcar los campos con error:
  ```tsx
  <input
    id="email"
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : undefined}
    {...register("email")}
  />
  ```
- **Botones**: Asegurarse de que los elementos clicables no semánticos (si se usan excepcionalmente) tengan `role="button"` y soporte para activación con teclado (`tabIndex={0}`).

---

## 6. Tabs y Contenido Pendiente

- Al implementar sistemas de pestañas (Tabs), si alguna de las pestañas no cuenta con diseño o lógica inmediata, renderizar un marcador de posición claro y limpio:
  ```tsx
  <div>Contenido de [Nombre de Pestaña] pendiente de implementar.</div>
  ```
