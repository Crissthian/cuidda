# Guía de Desarrollo Frontend - Formularios y Componentes

Este archivo define las directivas, criterios y ejemplos prácticos para la construcción de interfaces de usuario interactivas (React + Astro) en la plataforma Lucemedic.

---

## 1. Stack Frontend y Estructura

- **Framework**: Astro 5 (islas) + React 19 (interactividad)
- **Formularios**: React Hook Form + Zod (`@hookform/resolvers`)
- **Estado global**: Zustand (por dominio, solo cuando el estado sea complejo y multi-módulo)
- **Fetching / Caché**: TanStack Query (para fetching reactivo y sincronización de datos del servidor)
- **Lenguaje**: TypeScript strict (strict mode activado, sin usar `any`)

### Estructura de Carpetas de un Módulo
Cada módulo en el frontend debe organizarse bajo:
```text
src/components/<modulo>/
├── <Modulo>Container.tsx     # Shell: layout y estado global de la vista
├── <Modulo>Form.tsx          # Formulario de creación/edición
├── Lista<Modulo>.tsx         # Listado/tabla de registros
└── hooks/
    ├── use<Modulo>Form.ts    # Lógica RHF + Zod + submit
    └── use<Modulo>Data.ts    # Fetching / TanStack Query
```

---

## 2. Gestión de Formularios

### Reglas Obligatorias
- **Separación de Lógica**: Toda la lógica de negocio, validación de inputs y llamadas a Actions debe estar en el custom hook `use<Modulo>Form.ts`. El componente React (`.tsx`) solo se encarga de la presentación y enlace (`binding`) de datos.
- **Validación del Formulario**: Usar `mode: 'onBlur'` y `reValidateMode: 'onChange'` por defecto en formularios.
- **Mapeo de Errores**: Los errores del servidor devueltos por Actions deben mapearse al formulario mediante `form.setError()`. Nunca mostrar alertas de navegador flotantes genéricas (`alert()`) o toasts para errores de validación de campos del formulario.

### Custom Hook — Patrón Base
```typescript
// src/components/patient/hooks/usePatientForm.ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPatientSchema, type CreatePatientInput } from '@modules/patient/patient.schema'
import { actions } from 'astro:actions'

export function usePatientForm(onSuccess?: () => void) {
  const form = useForm<CreatePatientInput>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: { name: '', email: '', birthDate: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await actions.patient.create(data)
    if (result.error) {
      const field = result.error.field
      if (field) {
        form.setError(field as keyof CreatePatientInput, { type: 'server', message: result.error.message })
      } else {
        form.setError('root', { type: 'server', message: result.error.message })
      }
      return
    }
    form.reset()
    onSuccess?.()
  })

  return { form, onSubmit }
}
```

---

## 3. Botón de Submit y Estados de Carga

El texto del botón de envío debe reflejar claramente el modo actual y el estado de la petición:

| Modo | Estado normal | Estado cargando |
| :--- | :--- | :--- |
| **Crear** | `GUARDAR` | `GUARDANDO...` |
| **Editar** | `ACTUALIZAR` | `ACTUALIZANDO...` |

### Control de Deshabilitación en Edición
> [!IMPORTANT]
> En modo edición, el botón Submit y el formulario deben estar **deshabilitados por defecto** desde que el componente se monta hasta que los datos iniciales asíncronos (`initialData`) se hayan cargado completamente y se hayan aplicado al formulario mediante `form.reset(initialData)`. Esto previene el envío accidental de campos vacíos mientras se espera al servidor.

### Ejemplo de Implementación (Modo Edición + Carga)
```tsx
// Lógica en usePatientForm.ts
interface UsePatientFormOptions {
  mode: 'create' | 'edit'
  initialData?: PatientDTO
  onSuccess?: () => void
}

export function usePatientForm({ mode, initialData, onSuccess }: UsePatientFormOptions) {
  const isEditMode = mode === 'edit'

  const form = useForm<PatientFormDTO>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData ?? defaultPatientValues,
    // Formulario deshabilitado inicialmente si faltan datos en edición
    disabled: isEditMode && !initialData
  })

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset(initialData)
    }
  }, [initialData, isEditMode, form])

  // ...onSubmit...

  return { form, onSubmit, isEditMode }
}
```

```tsx
// src/components/patient/PatientForm.tsx
import { preventSubmitOnEnter } from '@/utils/preventSubmitOnEnter'

export function PatientForm({ mode, initialData, onSuccess }: PatientFormProps) {
  const { form, onSubmit, isEditMode } = usePatientForm({ mode, initialData, onSuccess })
  const { formState: { errors, isSubmitting, disabled } } = form

  const submitLabel = isEditMode
    ? isSubmitting ? 'ACTUALIZANDO...' : 'ACTUALIZAR'
    : isSubmitting ? 'GUARDANDO...'   : 'GUARDAR'

  return (
    <form onSubmit={onSubmit} onKeyDown={preventSubmitOnEnter} noValidate>
      {/* Campos del formulario */}

      {errors.root && (
        <div role="alert" className="error-banner">
          {errors.root.message}
        </div>
      )}

      <button type="submit" disabled={isSubmitting || !!disabled}>
        {submitLabel}
      </button>
    </form>
  )
}
```

---

## 4. Modos de Validación y Reseteo

### Modos de Validación
- `onBlur`: **Recomendado** para la gran mayoría de formularios estándares.
- `onChange`: Utilizado para feedback en tiempo real (por ejemplo, indicadores de seguridad de contraseñas).
- `onSubmit`: Solo para formularios extremadamente cortos o sencillos.

### Reseteo en Modo Edición
```typescript
// Sincronizar datos cargados asíncronamente
useEffect(() => {
  if (data) form.reset(data)
}, [data, form])

// Reseteo total para volver a modo creación (ej: al cerrar un modal)
form.reset(defaultValues)
```

---

## 5. Campos Dinámicos (`useFieldArray`)

Cuando un formulario requiere listas dinámicas de elementos (como medicamentos, diagnósticos, etc.), se debe utilizar `useFieldArray`:
```typescript
const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'medications'
})

const addItem = () => append({ name: '', dosage: '', frequency: '' })
```

---

## 6. Accesibilidad (A11Y)

Es obligatorio garantizar la accesibilidad y semántica HTML en todos los formularios:
- Asociar `<label>` e `<input>` explícitamente mediante `htmlFor` e `id`.
- Utilizar `aria-required="true"` en campos obligatorios.
- Utilizar `aria-invalid` y `aria-describedby` para vincular mensajes de error con sus inputs de forma comprensible para lectores de pantalla.

```tsx
<div>
  <label htmlFor="email">Correo electrónico</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : 'email-hint'}
    {...register('email')}
  />
  {errors.email && <span id="email-error" role="alert">{errors.email.message}</span>}
  <span id="email-hint">Ejemplo: usuario@lucemedic.com</span>
</div>
```

---

## 7. Prevenir Submit con Enter en Inputs

Para evitar que presionar la tecla Enter envíe involuntariamente el formulario en campos de entrada de texto normales, se debe interceptar el evento mediante el helper global `preventSubmitOnEnter`:

```typescript
// src/utils/preventSubmitOnEnter.ts
import type { KeyboardEventHandler } from 'react'

export const preventSubmitOnEnter: KeyboardEventHandler<HTMLFormElement> = (e) => {
  if (
    e.key === 'Enter' &&
    e.target instanceof HTMLElement &&
    e.target.tagName !== 'TEXTAREA' &&
    e.target.tagName !== 'BUTTON'
  ) {
    e.preventDefault()
  }
}
```

---

## 8. Gestión de Estado y Rendimiento

### Zustand vs State local vs TanStack Query
- **useState**: Para estado puramente local no compartido.
- **React Context**: Para compartir estado estático o de control entre componentes cercanos.
- **Zustand**: Reservado exclusivamente para estado complejo compartido entre módulos distantes o modales globales.
- **TanStack Query**: Fuente de verdad absoluta para la caché y sincronización de datos de servidor.

### Rendimiento (Suscripción Selectiva)
Para evitar re-renderizados innecesarios del componente TSX al escribir en el formulario:
```typescript
// ✅ CORRECTO: Suscribirse solo a propiedades específicas
const { isSubmitting } = form.formState

// ❌ EVITAR: Suscribirse al formState completo
const formState = form.formState

// ✅ CORRECTO: Usar watch para campos individuales específicos
const emailValue = form.watch('email')
```

---

## 9. Caret Transparente en Inputs de Solo Lectura / Visualización

En formularios y componentes de **visualización de datos** (modo lectura, previsualizaciones, campos de solo mostrar), ocultar el cursor de texto de los inputs para que no parezcan editables:

```tsx
// ✅ CORRECTO: Oculta el caret en inputs de visualización
<input
  type='text'
  readOnly
  className='caret-transparent'
/>

// Equivalente con CSS en Tailwind v4:
// type: caret-color: transparent;
```

- Usar `caret-transparent` (clase de Tailwind) en inputs `readOnly`/`disabled` que representan datos de solo lectura.
- Esto evita que el usuario asuma que puede editar el campo y mejora la claridad visual en vistas de auditoría, detalle o previsualización.

---

## 10. Anti-patrones Prohibidos (Frontend)

- ❌ Componentes TSX de React que contengan lógica de formulario compleja (sin usar custom hook).
- ❌ Botones de envío sin propiedad `type` explícita (siempre usar `<button type="button">` o `<button type="submit">`).
- ❌ Mostrar alertas de navegador genéricas (`alert()`) o toasts para errores de validación de campos del formulario.
- ❌ Suscribirse al `formState` completo en React Hook Form en vez de propiedades específicas.
- ❌ Botón de submit siempre habilitado en modo edición antes de que carguen los datos iniciales asíncronos.

---

## 11. Definition of Done (DoD) - Frontend

Un desarrollo se considera finalizado cuando:
- [ ] La lógica del formulario está encapsulada en un hook `use<Modulo>Form.ts`.
- [ ] El componente TSX solo se encarga de presentación, estilos y binding.
- [ ] El botón de submit refleja el modo (`GUARDAR` o `ACTUALIZAR`) y el estado de carga (`GUARDANDO...` o `ACTUALIZANDO...`).
- [ ] En modo edición, el formulario y botón de submit se inician deshabilitados hasta que `initialData` se aplique.
- [ ] Los errores del servidor se mapean a los campos específicos o al `root` del formulario.
- [ ] Todos los inputs tienen etiquetas asociadas semánticamente y los atributos ARIA para la gestión de errores.
- [ ] TypeScript compila sin errores ni advertencias de tipo `any`.

