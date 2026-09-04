# Instrucciones para crear commits Git

## Objetivo

Los commits deben ser **claros, pequeños, descriptivos y fáciles de revisar**. La IA debe crear commits que representen una única intención lógica y permitan entender rápidamente qué cambió y por qué.

---

## 1. Formato obligatorio

Utiliza **Conventional Commits**:

```text
<tipo>(<ámbito>): <descripción>
```

Ejemplos:

```text
feat(auth): agregar autenticación con JWT
fix(users): corregir validación del correo electrónico
refactor(api): separar lógica de negocio del controlador
docs(readme): actualizar instrucciones de instalación
test(users): agregar pruebas para creación de usuarios
perf(db): optimizar consulta de listado de pacientes
style(ui): ajustar espaciado del formulario
chore(deps): actualizar dependencias
build(docker): mejorar configuración de producción
ci(github): agregar workflow de integración continua
```

---

## 2. Tipos permitidos

Utiliza únicamente el tipo que mejor represente el cambio:

- `feat`: nueva funcionalidad.
- `fix`: corrección de un error.
- `refactor`: modificación interna sin cambiar el comportamiento.
- `perf`: mejora de rendimiento.
- `test`: creación o modificación de pruebas.
- `docs`: documentación.
- `style`: cambios de formato o estilos que no modifican la lógica.
- `chore`: mantenimiento general.
- `build`: cambios relacionados con compilación, dependencias o empaquetado.
- `ci`: cambios en integración o despliegue continuo.
- `revert`: revertir un commit anterior.

No utilices `feat` o `fix` si el cambio no corresponde realmente a una funcionalidad nueva o a una corrección.

---

## 3. Reglas para el mensaje

El mensaje debe:

- Estar escrito en **español**.
- Ser breve y específico.
- Utilizar verbos en infinitivo.
- Describir qué se modificó.
- Evitar explicaciones innecesarias.
- No terminar con punto.
- No utilizar mensajes genéricos.

### Buenos ejemplos

```text
feat(users): agregar creación de usuarios desde root
fix(auth): corregir expiración del token JWT
refactor(users): separar servicio de repositorio
perf(patients): optimizar consulta de pacientes
test(auth): agregar pruebas para inicio de sesión
docs(api): documentar endpoint de usuarios
```

### Malos ejemplos

```text
update
cambios
fix
se hicieron cambios
actualización del código
varios cambios
cosas nuevas
correcciones
```

---

## 4. Ámbito (scope)

El ámbito debe identificar la parte del proyecto afectada.

Ejemplos:

```text
auth
users
patients
appointments
api
database
frontend
backend
ui
docker
config
tests
```

Ejemplo:

```text
feat(users): agregar gestión de roles
```

En lugar de:

```text
feat: cambios en usuarios
```

Si el cambio afecta varias áreas y no existe un ámbito adecuado, se puede omitir:

```text
refactor: reorganizar estructura del proyecto
```

---

## 5. Un commit = una intención

Evita mezclar cambios independientes.

### Incorrecto

```text
feat(users): agregar usuarios, modificar Docker y actualizar README
```

Si son cambios independientes, dividirlos:

```text
feat(users): agregar gestión de usuarios
build(docker): actualizar configuración del contenedor
docs(readme): actualizar instrucciones de instalación
```

La IA debe intentar crear **commits atómicos** siempre que sea posible.

---

## 6. Antes de crear un commit

La IA debe revisar:

1. `git status`
2. Archivos modificados.
3. Diferencias mediante `git diff`.
4. Diferencias del área preparada mediante `git diff --staged`, si corresponde.
5. Identificar archivos no relacionados con el cambio.
6. Verificar que no se incluyan archivos sensibles.

No realizar un commit sin conocer qué archivos serán incluidos.

---

## 7. No incluir archivos sensibles

Nunca incluir deliberadamente:

```text
.env
.env.*
*.pem
*.key
credentials.*
secrets.*
```

También evitar:

- Contraseñas.
- API keys.
- Tokens.
- Credenciales de bases de datos.
- Certificados privados.
- Información personal sensible.

Si un archivo sensible aparece modificado, detener el proceso y advertirlo antes de realizar el commit.

---

## 8. Revisar el diff antes del commit

Antes de confirmar el commit, comprobar:

- Que los cambios correspondan al objetivo.
- Que no existan modificaciones accidentales.
- Que no haya código de depuración.
- Que no haya `console.log` innecesarios.
- Que no existan comentarios temporales.
- Que no se hayan incluido archivos generados.
- Que no se hayan introducido secretos.
- Que no se hayan sobrescrito cambios realizados por el usuario.

Si existen cambios ajenos al objetivo, no incluirlos.

---

## 9. Validaciones

Antes del commit, ejecutar las validaciones disponibles cuando sean relevantes:

```text
lint
tests
typecheck
build
```

Por ejemplo:

```bash
npm run lint
npm test
npm run typecheck
npm run build
```

Adaptar los comandos al proyecto.

Si una validación falla:

- No ocultar el error.
- No eliminar pruebas para hacerlas pasar.
- No modificar código no relacionado únicamente para evitar el error.
- Informar claramente del problema.

---

## 10. No crear commits artificiales

No crear commits únicamente para:

```text
guardar cambios
probar Git
hacer que aparezca un commit
```

Cada commit debe representar un cambio real y útil.

---

## 11. No modificar commits existentes sin autorización

No utilizar:

```bash
git commit --amend
git rebase
git reset --hard
git push --force
```

para modificar historial existente, salvo que el usuario lo solicite explícitamente.

Especialmente, nunca utilizar `git reset --hard` para descartar cambios del usuario sin autorización.

---

## 12. No hacer push automáticamente

Crear el commit no implica hacer `push`.

Después de crear el commit, informar:

```text
Commit creado correctamente:

feat(users): agregar gestión de usuarios
```

Solo realizar `git push` cuando el usuario lo solicite o cuando exista una instrucción explícita que lo permita.

---

## 13. Cuando existan muchos cambios

Si `git diff` contiene cambios de diferentes funcionalidades, agruparlos por intención.

Ejemplo:

```text
feat(auth): implementar autenticación JWT
feat(users): agregar gestión de roles
fix(api): corregir manejo de errores
test(auth): agregar pruebas de autenticación
docs(api): actualizar documentación
```

No crear un único commit:

```text
feat: implementar todo el sistema
```

---

## 14. Mensajes con BREAKING CHANGE

Si el cambio rompe compatibilidad con versiones anteriores, indicarlo.

Formato:

```text
feat(api)!: cambiar estructura de respuesta de usuarios
```

Cuando sea necesario, incluir una descripción adicional:

```text
feat(api)!: cambiar estructura de respuesta de usuarios

BREAKING CHANGE: el campo `data` ahora contiene un objeto paginado.
```

---

## 15. Regla para cambios pequeños

Para cambios simples, utilizar un commit simple:

```text
fix(api): corregir código de estado HTTP
```

No agregar una descripción extensa si no aporta información.

---

## 16. Regla para cambios complejos

Cuando un cambio tenga varias partes estrechamente relacionadas, se puede utilizar un cuerpo de commit:

```text
feat(auth): implementar autenticación con JWT

- agregar generación de tokens
- agregar middleware de autenticación
- validar expiración del token
- proteger rutas privadas
```

El cuerpo debe utilizarse únicamente cuando aporte contexto relevante.

---

## 17. Prioridad de las instrucciones

Al crear commits, seguir este orden:

1. Seguridad.
2. No perder cambios del usuario.
3. Mantener commits atómicos.
4. Revisar el diff.
5. Ejecutar validaciones.
6. Aplicar Conventional Commits.
7. Crear el commit.
8. Informar el resultado.

---

## 18. Regla principal para la IA

Antes de ejecutar `git commit`, responder mentalmente:

> ¿Puedo explicar este commit en una sola frase?

Si la respuesta es no, probablemente el cambio debe dividirse en varios commits.

El commit debe permitir que otro desarrollador entienda rápidamente:

**qué cambió + dónde cambió + cuál fue la intención.**

### Ejemplo final

```text
feat(users): agregar gestión de roles y permisos
```

Es preferible a:

```text
feat: actualización del módulo de usuarios
```
