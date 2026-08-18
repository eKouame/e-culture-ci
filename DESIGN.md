# Design

<!-- impeccable:design-schema 1 -->

## World: Le Carnet

The citizen-facing app (`(site)` route group) is styled as **le carnet** — the ledger a member keeps in a community savings group (tontine), not a government form. The product's hard constraint (never imply officialdom) is the reason for this choice, not a stylistic preference: a carnet is something a citizen owns and keeps for themselves, which reinforces "this prepares you, it doesn't officialize anything" instead of undermining it. `/communes` and `/admin` are out of scope for this world and keep their existing look.

Direction seed: `4dcac864` (assigned #4 of 7 grounded candidates, weighed against catalog challengers). Full contract lives as an HTML comment, first child of `<body>`, in `src/app/layout.tsx`.

## Palette

Unchanged from the pre-existing tokens in `src/app/globals.css` — this redesign is a material/compositional change, not a recolor:

- `--color-primary` `#e8590c` / `--color-primary-dark` `#c2410c` — orange ink, reserved for the "eC" badge (large/bold, brand-pinned) and decorative accents (borders, progress fills) that don't carry small body text
- Small/normal-weight orange text and interactive elements use `text-primary-dark` (`#c2410c`, ~5.2:1 on white) — never bare `text-primary`, which fails WCAG AA at body sizes
- `--color-secondary` `#0f8a3f` / `-dark` `#0a6b30` — green, "good news" / success states
- `--background` `#fafaf9`, `--color-surface` `#ffffff`, `--color-border` `#e5e2df` — the carnet's paper

## Material vocabulary

Defined as reusable utilities in `globals.css`, not one-off inline styles:

- **`.ledger-lines`** — repeating horizontal rule lines (`color-mix` of the border token, 30px pitch) as a card background, evoking ruled ledger paper. Applied to every carnet-world card: homepage module cards, the multi-step form cards, the mentorat form/confirmation, récapitulatif/confirmation cards.
- **`.dog-ear`** — a folded page corner (CSS triangle + drop-shadow) at a card's top-right. Applied everywhere `.ledger-lines` is.
- **`.stamp`** — a rotated (-4deg) circular badge, solid ring + offset dashed inner ring, `currentColor`-based so it takes the section's tone (green/orange). Used only for confirmation moments (`Stamp` component, `src/components/ui/Stamp.tsx`), never for navigation or decoration. Carries a drawn checkmark SVG, not an emoji — emoji-as-icon is off-limits per the craft floor.
- **`.tabular-ref`** — monospace, tabular-nums, tracked — applied to every dossier/reference number (`DEC-2026-000013` etc.) so they read as ledger entries.
- **`.page-turn`** — a short (0.32s), reduced-motion-aware slide/rotate keyed on the active step, used when advancing/going back in the two multi-step forms. One signature motion moment, not scattered transitions.
- **Step tally** (`ProgressBar.tsx`, despite its name) — numbered circles connected by a filled/unfilled line, replacing a plain progress bar. Used by the orientation questionnaire (4 steps) and both wizards (3 steps each), via a shared `label` prop ("Question" / "Étape").

## Composition rules for new work in this world

- A carnet card is `rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6` (or `Card` with `dogEar`) plus `.dog-ear.ledger-lines`. Don't invent a second card idiom.
- Confirmation moments (a form succeeded, a status is revealed) get a `Stamp`, never a plain colored pill or a raw emoji.
- Reference/dossier numbers always get `.tabular-ref`.
- Multi-step flows always show the step tally with `label="Étape"` and use the `page-turn` class keyed on the active step index — never a bare percentage bar.
- The independence disclaimer ("Document non officiel...") stays at the *top* of any confirmation card, beside the title — this predates the carnet world and the carnet must never crowd it out or bury it back in a footer.

## Explicitly out of scope

`/communes` (green/ocre Service Monde register) and `/admin` (internal back-office) were not touched and do not use this vocabulary — Product Principle #4 ("deux registres, jamais mélangés") means the carnet world stays specific to the citizen app.
