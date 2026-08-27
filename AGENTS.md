# Cuidda - Plataforma de Salud Ocupacional

> Sistema médico/ERP para gestión de salud ocupacional de colaboradores.

---

## 📦 Stack Principal

- **Framework**: Astro 7 + React 19
- **Lenguaje**: TypeScript 6 (modo estricto)
- **Estilos**: Tailwind CSS v4 + daisyUI 5
- **Package Manager**: pnpm

---

## 🗂️ Estructura de Carpetas

```
cuidda/
├── .agents/
│   └── skills/              # Skills personalizados del agente
├── .astro/                  # Cache de Astro (generado)
── .github/
│   └── workflows/           # CI/CD
├── .vscode/                 # Configuración IDE
├── public/                  # Assets estáticos
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── fondo-login.png
│   ├── ilustracion-login.png
│   ├── logo-cuidda.png
│   └── logo-lucemedic.png
├── src/
│   ├── components/          # Componentes React (.tsx)
│   ├── layouts/             # Layouts Astro (.astro)
│   ├── pages/               # Rutas (.astro/.tsx)
│   ├── styles/              # CSS global + temas
│   └── lib/                 # Utilidades internas
├── AGENTS.md                # Este archivo
├── astro.config.mjs         # Config Astro + Tailwind v4
── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

---

## 🚀 Scripts Disponibles

| Comando        | Descripción            |
| -------------- | ---------------------- |
| `pnpm dev`     | Servidor de desarrollo |
| `pnpm build`   | Build de producción    |
| `pnpm preview` | Preview del build      |
| `pnpm check`   | Type checking          |
| `pnpm format`  | Formatear con Prettier |

---

## 📚 Dependencias

### Core

| Paquete          | Versión | Uso               |
| ---------------- | ------- | ----------------- |
| `astro`          | ^7.2.8  | Framework web     |
| `@astrojs/react` | ^6.0.1  | Integración React |
| `@astrojs/check` | ^0.9.9  | Type checking     |
| `typescript`     | ^6.0.3  | Lenguaje          |

### UI / Styling

| Paquete             | Versión | Uso                     |
| ------------------- | ------- | ----------------------- |
| `tailwindcss`       | ^4.3.2  | Utility-first CSS       |
| `@tailwindcss/vite` | ^4.3.2  | Plugin Vite Tailwind v4 |
| `daisyui`           | ^5.6.10 | Componentes UI          |
| `lucide-react`      | ^1.23.0 | Iconos                  |
| `sonner`            | ^2.0.7  | Toast notifications     |

### Formularios / Validación

| Paquete               | Versión | Uso                    |
| --------------------- | ------- | ---------------------- |
| `react-hook-form`     | ^7.80.0 | Gestión de formularios |
| `@hookform/resolvers` | ^5.4.0  | Validación con Zod     |
| `zod`                 | ^4.4.3  | Validación de esquemas |

### Estado / Datos

| Paquete   | Versión | Uso              |
| --------- | ------- | ---------------- |
| `zustand` | ^5.0.14 | State management |
| `date-    |

` | ^4.4.0 | Manipulación de fechas |

### Documentos / Export

| Paquete               | Versión | Uso                           |
| --------------------- | ------- | ----------------------------- |
| `@react-pdf/renderer` | ^4.5.1  | Generación de PDFs            |
| `exceljs`             | ^4.4.0  | Lectura/escritura de Excel    |
| `xlsx`                | ^0.18.5 | Procesamiento de spreadsheets |

### Editor / Upload

| Paquete           | Versión | Uso                 |
| ----------------- | ------- | ------------------- |
| `react-quill-new` | ^3.8.3  | Editor WYSIWYG      |
| `react-dropzone`  | ^15.0.0 | Drag & drop uploads |

### Utilidades

| Paquete                     | Versión | Uso                  |
| --------------------------- | ------- | -------------------- |
| `dotenv`                    | ^16.6.1 | Variables de entorno |
| `@modelcontextprotocol/sdk` | ^1.29.0 | MCP SDK              |

### DevDependencies

| Paquete                 | Versión | Uso                   |
| ----------------------- | ------- | --------------------- |
| `prettier`              | ^3.9.4  | Formateo              |
| `prettier-plugin-astro` | ^0.14.1 | Plugin Prettier Astro |

---

## ⚙️ Configuración

### astro.config.mjs

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

---

## 🎨 Sistema de Diseño

### Fuente

- **Roboto** (Google Fonts CDN)
- Import: `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');`
- Aplicada en `body { font-family: Roboto, sans-serif; }`

### Variables CSS (`@theme` en `src/styles/global.css`)

#### Superficies

| Variable                  | Valor     | Uso                |
| ------------------------- | --------- | ------------------ |
| `--color-surface-light`   | `#f1f5f8` | Fondos secundarios |
| `--color-surface-default` | `#ffffff` | Fondo principal    |
| `--color-card-bg`         | `#e7e9ef` | Fondo de cards     |

#### Texto

| Variable                 | Valor     | Uso              |
| ------------------------ | --------- | ---------------- |
| `--color-text-primary`   | `#414d55` | Texto principal  |
| `--color-text-secondary` | `#636d73` | Texto secundario |

#### Marca

| Variable                | Valor     | Uso              |
| ----------------------- | --------- | ---------------- |
| `--color-brand`         | `#0064d2` | Color de marca   |
| `--color-primary-hover` | `#0052a3` | Hover de botones |

#### Bordes

| Variable                 | Valor     | Uso                |
| ------------------------ | --------- | ------------------ |
| `--color-border-subtle`  | `#a2c0d4` | Bordes sutiles     |
| `--color-border-default` | `#a2c0d4` | Bordes por defecto |

#### Acentos / Estados

| Variable               | Valor     | Uso              |
| ---------------------- | --------- | ---------------- |
| `--color-accent-muted` | `#8ea9ba` | Acentos apagados |
| `--color-muted`        | `#8993af` | Texto muted      |
| `--color-success`      | `#1ee67d` | Estado éxito     |
| `--color-warning`      | `#ff5b45` | Estado alerta    |
| `--aside-width`        | `350px`   | Ancho de aside   |

### Temas

| Tema              | Selector             | Descripción             |
| ----------------- | -------------------- | ----------------------- |
| **Light**         | `:root`              | Default, colores claros |
| **Dark**          | `html.dark`          | Slate oscuros           |
| **Pastel Modern** | `html.pastel-modern` | Púrpura/lavanda         |
| **Aqua Breeze**   | `html.aqua-breeze`   | Teal/cyan               |

### Componentes Reutilizables (`@layer components`)

| Clase                    | Uso                         |
| ------------------------ | --------------------------- |
| `.form-input`            | Input de texto estándar     |
| `.form-select`           | Select estándar             |
| `.form-label`            | Label de formulario         |
| `.form-select-container` | Contenedor de select custom |
| `.form-select-icon`      | Icono de select custom      |

### Animaciones

| Animación   | Clase                  | Uso                  |
| ----------- | ---------------------- | -------------------- |
| `fadeIn`    | `.modal-overlay`       | Overlay de modales   |
| `slideIn`   | `#modalContainer`      | Contenido de modal   |
| `bellShake` | -                      | Notificaciones       |
| `tabFadeIn` | `.animate-tab-fade-in` | Transiciones de tabs |

---

## 🤖 Skills del Agente

Ubicación: `.agents/skills/`

Cada skill tiene su propio `SKILL.md` con instrucciones específicas.

---

## 📝 Convenciones de Código

### Estructura de Archivos

| Tipo        | Ubicación         | Extensión         |
| ----------- | ----------------- | ----------------- |
| Layouts     | `src/layouts/`    | `.astro`          |
| Páginas     | `src/pages/`      | `.astro` / `.tsx` |
| Componentes | `src/components/` | `.tsx`            |
| Estilos     | `src/styles/`     | `.css`            |
| Utilidades  | `src/lib/`        | `.ts`             |

### Tailwind CSS v4

- Usar `@theme` para variables CSS custom
- Clases utilitarias estándar (evitar arbitrarias cuando existan equivalentes)
- `@plugin "daisyui"` para componentes UI
- No usar `<table>` HTML, usar `grid` o `flexbox`

### TypeScript

- Modo estricto (`astro/tsconfigs/strict`)
- Tipos en `.astro` frontmatter con `interface Props`

### React

- Componentes funcionales con hooks
- `react-hook-form` + `zod` para formularios
- `zustand` para estado global
- Iconos de `lucide-react`

### Formateo

- Prettier con plugin Astro
- Comando: `pnpm format`

---

## 🌿 Git & Commits

### Branches

- `main` - Producción
- `develop` - Desarrollo
- `feature/*` - Nuevas funcionalidades
- `fix/*` - Correcciones
- `release/*` - Preparación de releases

### Commits (Conventional Commits)

```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato (sin cambios de código)
refactor: refactorización
test: tests
chore: mantenimiento
```

---

## 📄 Licencia

Propietario - Lucemedic Salud Ocupacional
