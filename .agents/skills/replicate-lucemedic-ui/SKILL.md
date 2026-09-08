---
name: replicate-lucemedic-ui
description: Replicate UI code from lucemedic project into cuidda project, UI only, same styles, mock data in TS arrays when needed.
---

# Replicar UI de Lucemedic en Cuidda (Solo UI)

Usar esta skill cuando se pida portar, replicar o clonar una vista, componente, layout o módulo de `lucemedic` hacia `cuidda`.

Objetivo: misma apariencia visual, solo presentación. Sin backend, sin datos reales.

## 1. Origen y Destino

- Origen (solo lectura): `c:\Users\criss\Documents\PROYECTOS\lucemedic\src\`
  - `components/` (`.tsx`, `.astro`), `layouts/` (`.astro`), `pages/` (`.astro`), `styles/global.css`
- Destino (solo escritura): proyecto `cuidda`
  - Presentación: `src/components/<modulo>/`
  - Datos ejemplo: `src/lib/<modulo>Data.ts`
  - Rutas: `src/pages/`
  - Layouts existentes: `src/layouts/` (reutilizar, no duplicar)
- No leer ni copiar de `lucemedic`: `src/actions/`, `src/modules/`, `src/validators/`, `src/hooks/` con fetching, `src/utils/` con lógica, `middleware.ts`, `SQL/`, `.env`.

## 2. Alcance Estricto (Solo UI)

Portar:

- Estructura JSX/Astro, clases Tailwind, layout `flex`/`grid`, modales, tabs, KPIs, filtros visuales, tablas maquetadas.

No portar:

- `actions`, services, repositories, SQL parametrizado, transacciones, Zod schemas de servidor, auth, `Astro.locals`, fetching real, TanStack Query, Zustand global (salvo `useState` local).
- Si el origen llama a `actions.*` o `fetch`, reemplazar por datos mock y estado local.

## 3. Estilos Idénticos

Ambos proyectos usan mismo stack: Astro 7 + React 19 + Tailwind v4 + daisyUI (`themes: false`) + Roboto + `text-xs` base + resolución 1920x1080.

- Copiar clases Tailwind verbatim del origen. No reinventar estilos.
- Usar tokens `@theme` de `src/styles/global.css`: `bg-surface-default`, `bg-surface-light`, `bg-card-bg`, `text-text-primary`, `text-text-secondary`, `text-brand`, `text-muted`, `border-border-subtle`, `bg-brand`, `hover:bg-primary-hover`, `text-success`, `text-success-dark`, `text-warning`, `text-risk-red`, etc.
- No usar `<table>`. Usar `grid` o `flexbox`.
- Filas con `.map()`: bordes en contenedor con `divide-y divide-dashed divide-border-subtle`. No añadir `border-t` por fila salvo control independiente.
- Cabeceras: `text-[10px] font-semibold uppercase tracking-wider text-muted`.
- Formularios: clases `.form-input`, `.form-select`, `.form-label` de `@layer components`. Labels con `htmlFor`/`id`. `aria-invalid` si hay error.
- Botones: siempre `type="button"` o `type="submit"` explícito. Iconos Font Awesome 6: `<i className="fa-solid fa-plus mr-1" />`.
- Imports siempre con alias `@/*` (`@/components/...`, `@/lib/...`, `@/layouts/...`). Prohibido `../../`.
- TypeScript estricto. Sin `any`. Componentes funcionales React. Astro para rutas/layouts, React solo para interactividad (`client:load` / `client:only` según caso).

## 4. Datos de Ejemplo

Si la vista necesita listas, KPIs, tablas o selects:

1. Crear `src/lib/<modulo>Data.ts` (ej: `src/lib/emosData.ts`). No JSON, no literales inline en el componente.
2. Exportar arrays tipados y determinísticos (3-8 items):
   ```typescript
   export interface MatrizRow {
     id: number;
     trabajador: string;
     dni: string;
     puesto: string;
     sede: string;
   }

   export const matrizRows: MatrizRow[] = [
     {
       id: 1,
       trabajador: "Nombre Ejemplo",
       dni: "DNI 12345678",
       puesto: "Puesto",
       sede: "Sede Lima",
     },
   ];
   ```
3. Consumir con `.map()` y `key={item.id}`:
   ```tsx
   import { matrizRows } from "@/lib/matrizData";

   {
     matrizRows.map((row) => (
       <div key={row.id} className="grid ...">
         <span>{row.trabajador}</span>
       </div>
     ));
   }
   ```
4. Sin IDs aleatorios, sin fechas dinámicas, sin llamadas de red. Texto en español.

## 5. Flujo de Trabajo

1. Localizar origen en `lucemedic`: leer `.tsx`/`.astro` completo (chunks grandes, no lecturas línea por línea).
2. Extraer estructura + clases. Anotar props dinámicas que serán reemplazadas por mock.
3. Crear `src/lib/<modulo>Data.ts` si falta. Reutilizar existente si ya cubre el caso.
4. Crear/adaptar componente en `src/components/<modulo>/` con mismo layout y clases. Adaptar imports a `@/`. Reemplazar datos por import mock. Estado interactivo solo con `useState`.
5. Exponer en ruta `src/pages/` reutilizando `DashboardLayout.astro` o layout existente. Tabs sin diseño: `<div>Contenido de [Nombre] pendiente de implementar.</div>`.
6. Verificar: `pnpm check` y `pnpm build` si se tocaron rutas o config.

## 6. Checklist

- [ ] Solo UI, sin lógica de servidor ni fetching real.
- [ ] Clases Tailwind iguales al origen, tokens `@theme` correctos.
- [ ] Sin `<table>`, `type` en botones, A11Y mínima (`section`, `h2`, `label`, `aria-label`).
- [ ] Datos en `src/lib/<modulo>Data.ts` como array exportado, consumido con `.map()` + `key`.
- [ ] Alias `@/*`, TS estricto, sin `console.log`.
- [ ] Ruta reachable desde navegación o entry documentado.
