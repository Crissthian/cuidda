---
name: full-program-prototype
description: Build or extend a complete, believable program flow in this Astro prototype, from user entry point through feedback states and validation.
---

# Full Program Prototype

Use this skill when a request adds or changes a product capability, route,
workflow, dashboard, form, or other user-facing behavior in Cuidda.

The goal is a credible vertical slice that demonstrates how the complete program
works, while avoiding speculative production infrastructure.

## Workflow

1. **Map the user journey.** Identify who starts the flow, the route or action
   that begins it, the expected outcome, and how the user returns or continues.
2. **Model the feature.** Reuse or add focused domain types and deterministic
   fixture data. Keep the page independent from the eventual API by consuming a
   small local data module rather than inline object literals.
3. **Build the normal path.** Provide the primary user action and a visible
   success or resulting state. Ensure every new route is reachable from existing
   navigation or a documented prototype entry point.
4. **Complete the feedback states.** Add only the states appropriate to the
   feature:
   - empty state when no records or options exist;
   - loading state for simulated deferred data or client actions;
   - inline validation and recovery guidance for forms;
   - error state when an action or data request can fail.
5. **Make it usable.** Use semantic headings, landmarks, labels, keyboard-safe
   controls, focus visibility, and responsive layouts.
6. **Verify the slice.** Exercise the flow in the browser and run `pnpm build`
   after changing routes, components, or configuration.

## Implementation Boundaries

- Prefer Astro components and server-rendered markup. Add client-side JavaScript
  only for genuine browser interaction.
- Put reusable presentation in `src/components/`.
- Put domain types and fixture repositories in a focused `src/` module; do not
  make pages own mutable application state.
- Keep fixtures deterministic. Avoid random IDs, timestamps, and network calls
  unless the request explicitly needs them.
- Never fabricate authentication, payment, persistence, permissions, or
  integrations as if they were real. Clearly label simulated behavior in the UI
  when users could otherwise misunderstand it.

## Completion Checklist

- The journey has a reachable entry point and outcome.
- The normal path works without an external service.
- Relevant empty, validation, loading, and error states are intentional.
- The UI is navigable by keyboard and works on narrow screens.
- `pnpm build` succeeds.

## Example

For a request such as “add appointment booking,” do **not** only create a
calendar card. Create the entry route, an available-slot fixture, the selection
and confirmation interaction, a no-slots message, validation for missing
selection, and a confirmation state. Keep slots in a local repository module so
a future API can replace it without rewriting the page.
