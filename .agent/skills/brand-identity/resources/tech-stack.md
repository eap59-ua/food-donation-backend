# Design tokens scope (must not drift)
`design-tokens.json` is the **only** source of truth for:
- **Colors:** `primary` (DEFAULT/hover/foreground), `secondary` (DEFAULT/foreground), `background`, `foreground`, `muted`, `accent`, `destructive`, `success`
- **Typography:** headings = `Inter`, body = `Roboto`, weights: bold `700`, normal `400`
- **UI:** border radius default `0.5rem`, small `0.25rem`
- **Spacing:** base unit `4px`

These values MUST NOT be duplicated as a second palette/token list in other files.


# Token mapping location (Tailwind + shadcn)
The mapping from `design-tokens.json` to Tailwind/shadcn semantic tokens MUST be implemented as **CSS variables** in:
- `frontend/src/styles/globals.css` (preferred), or
- `frontend/src/index.css` (if the project keeps a single global stylesheet)

Those CSS variables are the ones consumed by Tailwind classes such as:
- `bg-primary text-primary-foreground`
- `bg-secondary text-secondary-foreground`
- `bg-background text-foreground`
- `bg-muted text-muted-foreground`
- `bg-accent text-accent-foreground`