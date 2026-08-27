# Cuidda: Product Prototype Guidelines

## Product Goal

This repository is a functional prototype of a complete program, not a collection
of isolated screens. Treat every change as part of a coherent user journey:

- Prefer an end-to-end vertical slice over disconnected visual mockups.
- Make navigation, empty states, loading states, validation, and error feedback
  believable whenever a feature has them.
- Use deterministic local fixture data when a backend is not yet available.
- Keep boundaries ready for a future backend: place domain types and data access
  behind focused modules rather than embedding them in page markup.
- Do not introduce authentication, persistence, third-party services, or other
  irreversible product decisions without an explicit requirement.

## Delivery Workflow

Before implementing a feature:

1. Identify the affected user flow and entry point.
2. Search for existing components, styles, types, and patterns to reuse.
3. Define the smallest complete slice, including its normal, empty, and invalid
   states.
4. Keep the implementation accessible and responsive from the first version.

After implementing a feature:

1. Verify that each changed route can be reached through the UI.
2. Run the narrowest available validation command; run `pnpm build` for route,
   component, or configuration changes.
3. Update the README when setup, available flows, or the prototype scope changes.

## Astro Conventions

- Use Astro components by default. Add a client framework only when interaction
  cannot be expressed cleanly with Astro and small browser scripts.
- Keep reusable UI in `src/components/`, domain types and fixture data in focused
  modules under `src/`, and routes in `src/pages/`.
- Use semantic HTML, visible focus styles, associated form labels, and native
  controls before custom alternatives.
- Keep browser-only code scoped to the component that needs it. Do not access
  `window` or `document` from frontmatter.

## Development

Start the development server in the background:

```sh
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Consult the relevant Astro documentation before making framework-specific changes:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
