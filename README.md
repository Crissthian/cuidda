# Cuidda — Sistema médico Lm

Prototipo funcional (sin backend) del **Sistema médico Lm - Cuidda**, construido
con [Astro](https://astro.build) sobre datos de ejemplo deterministas. El
objetivo es demostrar el flujo completo del programa —navegación, estados de
carga/vacío/error y validaciones— antes de conectar servicios reales.

## Origen del diseño (Figma)

Diseño de referencia: **Sistema médico Lm - Cuidda** (archivo Figma, páginas
`Cover`, `Page 1`, `Page 2`). El archivo define 39 pantallas que conforman el
recorrido del usuario:

| Módulo                        | Pantallas                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Acceso                        | LOGIN - Perfil médico, Menú principal                                                             |
| Panel general                 | 1. Tablero general, 2. Estudio línea base                                                         |
| Seguridad y salud ocupacional | 3. EMOS y trabajadores, 4. Matriz IPERC, 5. Monitoreos                                            |
| Protocolos médicos            | 6. Protocolos médicos 1, 2.1, 2.2, 2.3, 2.4                                                       |
| Planificación                 | 7. Plan anual, 8–10. Programas de salud (1–4)                                                     |
| Capacitación y riesgos        | 11. Capacitaciones, 12. Accidentes e incidentes, 13. Estratificación, 14. Ausentismo y morbilidad |
| Consultas y terceros          | 15. Contratistas, 16. Consultas técnicas S.O. (1–3)                                               |
| Administración                | 17. Perfiles y permisos, 18. Firmas                                                               |

Componentes y estados reutilizables identificados en el diseño: `Mensaje
cargado`, `Mensaje enviado`, `Cargar documento (1–4)`, `Nueva consulta`,
`Componente botón`, `Atrás`. Estos deben modelarse en el prototipo como estados
de UI (carga, envío, adjuntos) y no como llamadas reales a servicios.

## Stack y dependencias (`package.json`)

- **Runtime:** Node.js `>=22.12.0`.
- **Framework:** `astro` `^7.2.8` (única dependencia de producción). Todas las
  páginas se construyen con componentes `.astro` renderizados en servidor;
  se añade JavaScript de cliente solo cuando la interacción lo exige.
- **Gestor de paquetes:** `pnpm` (ver `pnpm-workspace.yaml` y
  `pnpm-lock.yaml`).
- **Scripts disponibles:**

  | Comando          | Acción                                                               |
  | ---------------- | -------------------------------------------------------------------- |
  | `pnpm install`   | Instala dependencias                                                 |
  | `pnpm dev`       | Levanta el servidor de desarrollo en `http://localhost:4321`         |
  | `pnpm build`     | Genera el sitio de producción en `./dist/`                           |
  | `pnpm preview`   | Sirve el build de producción localmente                              |
  | `pnpm astro ...` | Ejecuta comandos del CLI de Astro (`astro add`, `astro check`, etc.) |

No hay dependencias de backend, base de datos ni autenticación real: al no
tener paquetes de servidor/cliente HTTP, persistencia o auth en
`package.json`, el prototipo debe simular esas capas con módulos de datos
locales y deterministas (ver [AGENTS.md](./AGENTS.md)).

## Desarrollo

```sh
pnpm install
pnpm dev
```

La app corre localmente en `http://localhost:4321`.

## Validación

```sh
pnpm build
```

## Principios del prototipo

- Construir recorridos completos (login → menú → módulo → confirmación) en
  lugar de pantallas aisladas.
- Usar datos de fixture locales y deterministas mientras no exista backend.
- Cubrir estados normal, vacío, carga, validación y error cuando la pantalla
  de Figma los contempla (p. ej. `Mensaje cargado`, `Mensaje enviado`,
  `Cargar documento`).
- Mantener límites claros entre componentes de UI (`src/components/`) y datos
  de dominio (fixtures/`src/`) para que el prototipo pueda evolucionar a una
  aplicación real sin reescribir páginas.

Para la guía de implementación, consulta [AGENTS.md](./AGENTS.md) e invoca el
skill `full-program-prototype` al crear o extender un flujo del producto.
